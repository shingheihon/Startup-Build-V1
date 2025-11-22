import React from 'react';
import './GradientBackground.css';

const GradientBackground = () => {
    return (
        <div className="gradient-background">
            <div className="gradient-background__layer gradient-background__layer--1"></div>
            <div className="gradient-background__layer gradient-background__layer--2"></div>
            <div className="gradient-background__layer gradient-background__layer--3"></div>
        </div>
    );
};

export default GradientBackground;
