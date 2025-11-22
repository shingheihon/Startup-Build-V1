import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PixelBlastOptimized.css';

// Simplified shader - removed FBM complexity, reduced to 2 octaves
const VERTEX_SRC = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;

// Simplified Bayer dithering
float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}

// Simple hash function
float hash11(float n){ 
  return fract(sin(n) * 43758.5453); 
}

// Simplified 2-octave noise
float simpleNoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  
  float n000 = hash11(dot(ip, vec3(1.0, 57.0, 113.0)));
  float n100 = hash11(dot(ip + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n010 = hash11(dot(ip + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  float n110 = hash11(dot(ip + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, 113.0)));
  
  vec3 w = fp * fp * (3.0 - 2.0 * fp);
  float x0 = mix(n000, n100, w.x);
  float x1 = mix(n010, n110, w.x);
  
  return mix(x0, x1, w.y);
}

// 2-octave FBM
float fbm(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float sum = simpleNoise(p);
  sum += simpleNoise(p * 2.0) * 0.5;
  return sum * 0.66;
}

void main(){
  vec2 fragCoord = gl_FragCoord.xy - uResolution * 0.5;
  vec2 pixelUV = fract(fragCoord / uPixelSize);
  vec2 uv = fragCoord / uResolution;

  // Simplified pattern generation
  float base = fbm(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;
  float feed = base + (uDensity - 0.5) * 0.3;

  // Simplified dithering
  float bayer = Bayer2(fragCoord / uPixelSize) - 0.5;
  float pattern = step(0.5, feed + bayer);

  // Simple circle mask
  float r = 0.25;
  float d = length(pixelUV - 0.5) - r;
  float M = pattern * (1.0 - smoothstep(0.0, 0.1, d * 2.0));

  vec3 color = uColor;
  gl_FragColor = vec4(color, M);
}
`;

const PixelBlastOptimized = ({
    variant = 'circle',
    pixelSize = 8,
    color = '#86a888',
    patternScale = 2,
    patternDensity = 1.0,
    speed = 0.4,
    transparent = true,
    pauseWhenOffscreen = true
}) => {
    const containerRef = useRef(null);
    const threeRef = useRef(null);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        try {
            // Create renderer with optimized settings
            const canvas = document.createElement('canvas');
            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: false,
                powerPreference: 'low-power',
                failIfMajorPerformanceCaveat: false // Don't fail on low-end devices
            });

            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
            container.appendChild(renderer.domElement);

            if (transparent) renderer.setClearAlpha(0);
            else renderer.setClearColor(0x000000, 1);

            // Simplified uniforms
            const uniforms = {
                uResolution: { value: new THREE.Vector2(0, 0) },
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
                uScale: { value: patternScale },
                uDensity: { value: patternDensity }
            };

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

            const material = new THREE.ShaderMaterial({
                vertexShader: VERTEX_SRC,
                fragmentShader: FRAGMENT_SRC,
                uniforms,
                transparent: true,
                depthTest: false,
                depthWrite: false
                // Removed glslVersion for GLSL 1 compatibility
            });

            const quadGeom = new THREE.PlaneGeometry(2, 2);
            const quad = new THREE.Mesh(quadGeom, material);
            scene.add(quad);

            const clock = new THREE.Clock();

            const setSize = () => {
                const w = container.clientWidth || 1;
                const h = container.clientHeight || 1;
                renderer.setSize(w, h, false);
                uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
                uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
            };

            setSize();

            // Throttled resize observer
            let resizeTimeout;
            const ro = new ResizeObserver(() => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(setSize, 100); // Debounce resize
            });
            ro.observe(container);

            // Intersection Observer for pause when offscreen
            let intersectionObserver;
            if (pauseWhenOffscreen) {
                intersectionObserver = new IntersectionObserver(
                    (entries) => {
                        isVisibleRef.current = entries[0].isIntersecting;
                    },
                    { threshold: 0 }
                );
                intersectionObserver.observe(container);
            }

            let raf = 0;
            const animate = () => {
                raf = requestAnimationFrame(animate);

                // Pause animation when not visible
                if (pauseWhenOffscreen && !isVisibleRef.current) {
                    return;
                }

                uniforms.uTime.value = clock.getElapsedTime() * speed;
                renderer.render(scene, camera);
            };

            raf = requestAnimationFrame(animate);

            threeRef.current = {
                renderer,
                scene,
                camera,
                material,
                clock,
                uniforms,
                resizeObserver: ro,
                intersectionObserver,
                raf,
                quad
            };

            return () => {
                cancelAnimationFrame(raf);
                ro?.disconnect();
                intersectionObserver?.disconnect();
                quad?.geometry.dispose();
                material.dispose();
                renderer.dispose();
                if (renderer.domElement.parentElement === container) {
                    container.removeChild(renderer.domElement);
                }
                threeRef.current = null;
            };
        } catch (error) {
            console.error('PixelBlast initialization error:', error);
            // Fallback: show nothing rather than crash
            return () => { };
        }
    }, [pixelSize, patternScale, patternDensity, speed, transparent, color, pauseWhenOffscreen]);

    return (
        <div
            ref={containerRef}
            className="pixel-blast-optimized-container"
            aria-label="Animated background"
        />
    );
};

export default PixelBlastOptimized;
