import './App.css';
import React, {useState, useEffect } from "react";
import arrayShuffler from './utils/shuffler';
import Fireworks from './utils/Fireworks';
import { Data } from './utils/Array';

//use of fisher yates shuffle to randomise array 
const shuffled = arrayShuffler(Data);
const free = "FREE";
// console.log(shuffled)
//insert empty value into middle of string
const bingoArray = shuffled.splice(12, 0, free);
// console.log(bingoArray);

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
  // middle tile is always free set in state
  const [state, setState] = useState({ checked: {12:true} });
  //check if player has won returns boolean
  const hasWon = checked => {
    //range is based on column and row length of 5
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
  //on toggle function toggles state and checks for wins
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
      {
        //map shuffled array to populate tiles
        Object.keys(shuffled).map(mapValue => {
          // s
          if (shuffled[mapValue] === free) {
            return (
              <Tile key={mapValue} id={mapValue} isSet={!!state.checked[mapValue]}>
                {shuffled[mapValue]}
              </Tile>
            )
          }
          return (
            <Tile key={mapValue} id={mapValue} isSet={!!state.checked[mapValue]} onToggle={() => winToggle(mapValue) } >
              {shuffled[mapValue]}
            </Tile>
          )
        }
        )
      }
    </div>
      {//win triggers fireworks animation
      state.win ? <Fireworks />: null
      }
     
    </div>
    <button className="reset" onClick={refresh}>RESET</button>
    </div>
  );
}
