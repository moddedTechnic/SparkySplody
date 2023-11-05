import React, { Component } from 'react';
import { useState } from 'react';
import styles from "./Rectangles.module.css";

function Rectangles() {

    const angles = [0, 0, 0, 0, 0, 0];

    console.log(document.getElementById("sliderOne")?.innerHTML.valueOf());

    return (
        <div className={styles.parent} style={{'--angle': `${angles[1]}deg`} as React.CSSProperties}>
            <div className={styles.child} style={{'--angle': `${angles[2]}deg`} as React.CSSProperties}>
                <div className={styles.child} style={{'--angle': `${angles[3]}deg`} as React.CSSProperties}>
                    <div className={styles.child} style={{'--angle': `${angles[4]}deg`} as React.CSSProperties}>

                    </div >
                </div >
            </div >
        </div >
    );
}

export default Rectangles;