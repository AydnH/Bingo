import './App.css';
import React, {useState, useEffect } from "react";
import arrayShuffle from "shuffle-array"; //easy way to shuffle an array
import Fireworks from './Fireworks';
import { Data } from './Array';

//use of arrayshuffle to randomise array 
const shuffled = arrayShuffle(Data);
const free = " ";
//insert empty value into middle of string
const bingoArray = shuffled.splice(12, 0, free);
console.log(bingoArray);

//tile format
function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile-set" : ""}`}>
      {children}
    </div>
  );
}

function refresh(){
  window.location.reload(false);
}

export default function App() {
  const [state, setState] = useState({ checked: {} });
  //check if player has won
  const hasWon = checked => {
    const range = [0, 1, 2, 3 ,4];
    return (
      //check columns
      undefined !==
          range.find(row => range.every(column => checked[row * 5 + column])) ||
      //check rows
      undefined !==
          range.find(column => range.every(row => checked[row * 5 + column])) ||
      //check diagonal
        range.every(index => checked[index * 5 + index]) || 
        range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const winToggle = id => 
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const win = hasWon(checked);
      return {
        ...state,
        checked,
        win
      }
    });

  return (
    <div className="background">
    <div className="App">
      <h1 className="heading">Zoom Call Bingo</h1>

      <div className="wrapper">
        {console.log(shuffled)}
      {
        //map shuffled array to populate tiles
        Object.keys(shuffled).map(id => 
          (
          <Tile key={id} id={id} isSet={!!state.checked[id]} onToggle={() => winToggle(id) } >
            {shuffled[id]}
          </Tile>
        ))
      }
      </div>
      {//win triggers fireworks
      state.win ? <Fireworks />: null
      }
     
    </div>
    <button className="reset" onClick={refresh}>RESET</button>
    </div>
  );
}
