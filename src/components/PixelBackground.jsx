import React, { useEffect, useRef } from 'react';
import './PixelBackground.css';

const PixelBackground = ({ color = '#86a888', pixelSize = 20, density = 0.3 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createPixels = () => {
            // Clear existing pixels
            container.innerHTML = '';

            const width = window.innerWidth;
            const height = window.innerHeight;
            const cols = Math.floor(width / pixelSize);
            const rows = Math.floor(height / pixelSize);
            const totalPixels = cols * rows;
            const activePixels = Math.floor(totalPixels * density);

            // Create active pixel positions
            const pixels = [];
            for (let i = 0; i < activePixels; i++) {
                const col = Math.floor(Math.random() * cols);
                const row = Math.floor(Math.random() * rows);
                const x = col * pixelSize;
                const y = row * pixelSize;

                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.left = `${x}px`;
                pixel.style.top = `${y}px`;
                pixel.style.width = `${pixelSize}px`;
                pixel.style.height = `${pixelSize}px`;
                pixel.style.backgroundColor = color;
                pixel.style.animationDelay = `${Math.random() * 4}s`;
                pixel.style.animationDuration = `${2 + Math.random() * 3}s`;

                container.appendChild(pixel);
                pixels.push(pixel);
            }
        };

        createPixels();

        // Recreate on resize (debounced)
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(createPixels, 300);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [color, pixelSize, density]);

    return <div ref={containerRef} className="pixel-background" />;
};

export default PixelBackground;
