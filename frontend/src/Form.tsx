import React, { Component } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';

function Post(motor: number, value: number){

    const method: string = ((value & 0x1FF) | (0x200) | ((motor & 0x0F) << 10)).toString(36)
    console.log("method:", method)
    fetch(`http://100.73.203.93:8666/?v=${method}`, {
        method: "GET"
    })
}

function Form(){

    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);
    const [six, setSix] = useState(0);

    return (
        <form>
            <p>Servo 1</p>
            <input className={styles.slider} type="range" id="sliderOne" min="0" max="180" value= { one } name="1" onChange={(e) => {setOne(Number(e.target.value)); Post(0, Number(e.target.value))}} />
            <br />
            <p>Servo 2</p>
            <input className={styles.slider} type="range" id="sliderTwo" min="0" max="180" value= { two } name="2" onChange={(e) => {setTwo(Number(e.target.value)); Post(1, Number(e.target.value))}} />
            <br />
            <p>Servo 3</p>
            <input className={styles.slider} type="range" id="sliderThree" min="0" max="180" value= { three } name="3" onChange={(e) => {setThree(Number(e.target.value)); Post(2, Number(e.target.value))}} />
            <br />
            <p>Servo 4</p>
            <input className={styles.slider} type="range" id="sliderFour" min="0" max="180" value= { four } name="4" onChange={(e) => {setFour(Number(e.target.value)); Post(3, Number(e.target.value))}} />
            <br />
            <p>Servo 5</p>
            <input className={styles.slider} type="range" id="sliderFive" min="0" max="180" value= { five } name="5" onChange={(e) => {setFive(Number(e.target.value)); Post(4, Number(e.target.value))}} />
            <br />
            <p>Servo 6</p>
            <input className={styles.slider} type="range" id="sliderSix" min="0" max="180" value= { six } name="6" onChange={(e) => {setSix(Number(e.target.value)); Post(5, Number(e.target.value))}} />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </form>
    );
}

export default Form;