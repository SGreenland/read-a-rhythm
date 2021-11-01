import "./App.css";
import React, { useState } from "react";
import GetMusic from './GetMusic';

function App() {
  const [tempoValue, setTempoValue] = useState(60);
  const [timeSig, setTimeSig] = useState("4/4");
  const [difficulty, setDifficulty] = useState("Easy");
  const blank = require("./images/blankspace.png").default;
  const blankSquare = (
    <img
      className="note"
      src={blank}
      alt="blank"
      style={{ background: "transparent" }}
    />
  );
  const [bar, setBar] = useState([blankSquare, blankSquare, blankSquare, blankSquare]);

  

  function toggleOptions(e) {
        if (e.target.id === "selectTime" && document.getElementById("timeSigOptions").className === "hideOptions") {
            document.getElementById("timeSigOptions").className = "showOptions"
          }
        else if (e.target.id === "selectTime" && document.getElementById("timeSigOptions").className === "showOptions") {
          document.getElementById("timeSigOptions").className = "hideOptions"
        }
         if (e.target.id === "selectDifficulty" && document.getElementById("difficultyOptions").className === "hideOptions"){
          document.getElementById("difficultyOptions").className = "showOptions"
        }
        else if (e.target.id === "selectDifficulty" && document.getElementById("difficultyOptions").className === "showOptions"){
          document.getElementById("difficultyOptions").className = "hideOptions"
        }
      }

    function clearOptions(e) {
        const options = Array.from(document.getElementsByClassName("showOptions"));
        options.forEach(option => option.className = "hideOptions")
    }
  
  

  const getTimeOption = (e) => {   
        setTimeSig(e.target.innerHTML) 
        const emptyBar = new Array(e.target.value).fill(blankSquare)
        setBar(emptyBar)
        document.getElementById("bar").style.gridTemplateColumns = `repeat(${e.target.value}, 1fr)`
    }

  const getDiffOption = (e) => {
      setDifficulty(e.target.innerHTML)
  }

  function displayHelp() {
    const help = document.getElementById("help")
    if(help.style.display === "none") {
      help.style.display = "grid";
    }
    else {
      help.style.display = "none"
    }
    
  }
    

  

  return (
    <div className="main">
      <div id="heading">
        <div id="heading-container"><h1>Read-a-Rhythm</h1></div>
        <span id="helpBtnContainer"><button id="helpBtn" onClick={displayHelp} style={{color: "whitesmoke", textDecoration: "none"}}>Help</button></span>
      </div>   
        <div className="options">   
        <div className= "option">
          <div class="optionHeader">Time-sig:</div>    
         <button onClick={toggleOptions} id="selectTime">{timeSig} </button>
          <div id="timeSigOptions" onMouseLeave={clearOptions} className="hideOptions" >
            <li onClick={getTimeOption} onMouseUp={clearOptions} className="timeOption" value="4/4">4/4</li>
            <li onClick={getTimeOption} onMouseUp={clearOptions} className="timeOption" value="3/4">3/4</li>
            <li onClick={getTimeOption} onMouseUp={clearOptions} className="timeOption" value="5/4">5/4</li>
          </div>
          </div>  
          <div className= "option">
          <div class="optionHeader">Difficulty: </div>  
          <button onClick={toggleOptions} id="selectDifficulty">{difficulty} </button>
          <div id="difficultyOptions" onMouseLeave={clearOptions} className="hideOptions" >
            <li onClick={getDiffOption} onMouseUp={clearOptions} className="timeOption" value="4/4">Easy</li>
            <li onClick={getDiffOption} onMouseUp={clearOptions} className="timeOption" value="3/4">Medium</li>
            <li onClick={getDiffOption} onMouseUp={clearOptions} className="timeOption" value="5/4">Hard</li>
          </div>
          </div>
          <div className= "option">
          <div className="optionHeader">Tempo: </div>
          <input
            id="tempo"
            type="range"
            min="60"
            max="250"
            value={tempoValue}
            onInput={() => setTempoValue(document.getElementById("tempo").value)}
          ></input>
          <span>{tempoValue}bpm</span>
          </div>
        </div>
        <GetMusic tempo={tempoValue} timeSig={timeSig} difficulty={difficulty} bar={bar} setBar={setBar} blankSquare={blankSquare} closeHelp={displayHelp} />   
    </div>
  );
}

export default App;
