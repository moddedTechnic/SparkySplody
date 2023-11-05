import React, {useState} from 'react';

function Post(motor: number, value: number) {
  fetch("http://100.73.203.93:8666", {
        body: JSON.stringify({"motor": motor, "angle": value}),
        headers: {"Content-Type": "text/plain"},
        method: "post"
      }
  )
}

function Form() {

  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);

  return (
      <form>
        <input type="range" min="0" max="180" value={one} name="1" onChange={(e) => {
          setOne(Number(e.target.value));
          Post(1, Number(e.target.value))
        }}/>
        <input type="range" min="0" max="180" value={two} name="2" onChange={(e) => {
          setTwo(Number(e.target.value));
          Post(2, Number(e.target.value))
        }}/>
        <input type="range" min="0" max="180" value={three} name="3" onChange={(e) => {
          setThree(Number(e.target.value));
          Post(3, Number(e.target.value))
        }}/>
        <input type="range" min="0" max="180" value={four} name="4" onChange={(e) => {
          setFour(Number(e.target.value));
          Post(4, Number(e.target.value))
        }}/>
        <input type="range" min="0" max="180" value={five} name="5" onChange={(e) => {
          setFive(Number(e.target.value));
          Post(5, Number(e.target.value))
        }}/>
        <input type="range" min="0" max="180" value={six} name="6" onChange={(e) => {
          setSix(Number(e.target.value));
          Post(6, Number(e.target.value))
        }}/>
      </form>
  );
}

export default Form;