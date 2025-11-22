import React from 'react';
import './SilkCSS.css';

const SilkCSS = ({
    speed = 5,
    scale = 1,
    color = '#86a888',
    noiseIntensity = 1.5,
    rotation = 0
}) => {
    // Calculate animation duration based on speed (inverse relationship)
    const duration = 20 / speed;

    return (
        <div
            className="silk-background"
            style={{
                '--silk-color': color,
                '--silk-duration': `${duration}s`,
                '--silk-scale': scale,
                '--silk-rotation': `${rotation}deg`,
                '--silk-noise': noiseIntensity
            }}
        >
            <div className="silk-wave silk-wave-1"></div>
            <div className="silk-wave silk-wave-2"></div>
            <div className="silk-wave silk-wave-3"></div>
            <div className="silk-wave silk-wave-4"></div>
            <div className="silk-noise"></div>
        </div>
    );
};

export default SilkCSS;
