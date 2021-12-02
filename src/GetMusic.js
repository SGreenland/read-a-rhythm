import React, { useState, useEffect } from "react";
import HelpInfo from "./HelpInfo";
import Tooltip from "./Tooltip";
import { nanoid } from "nanoid";

export default function GetMusic({
  tempo,
  timeSig,
  difficulty,
  bar,
  setBar,
  closeHelp,
}) {
  const blank = require("./images/blankspace.png").default;
  const crotchet = require("./images/1.png").default;
  const minim = require("./images/2.png").default;
  const crotchetRest = require("./images/3.png").default;
  const quavers = require("./images/4.png").default;
  const dottedMinim = require("./images/5.png").default;
  const restAnd = require("./images/7.png").default;
  const semiQuavers = require("./images/8.png").default;
  const strawBerry = require("./images/10.png").default;
  const lemonade = require("./images/12.png").default;
  const triplet = require("./images/triplet.png").default;
  const metronome = require("./metronome/woodblock.mp3").default;
  const metroIcon = require("./images/metroIcon.png").default;
  const barLine = require("./images/barLine.png").default;
  const repeatBarLeft = require("./images/repeatBarLeft.png").default;
  const repeatBarRight = require("./images/repeatBarRight.png").default;
  let timeInterval = (60 / tempo) * 1000;
  let start;
  var click = new Audio(metronome);
  const [width, setWidth] = useState("100%");

  const noteChoicesEasy = [
    <img
      className="note"
      src={crotchet}
      alt="crotchet"
      id="1"
      style={{ background: "transparent", width: width }}
    />,
    <img
      className="note"
      src={minim}
      alt="minim"
      id="2"
      style={{ background: "transparent", width: width }}
    />,
    <img
      className="note"
      src={crotchetRest}
      alt="crotchet-rest"
      id="1"
      style={{ background: "transparent", width: width }}
    />,
  ];
  const noteChoicesMedium = [
    <img
      className="note"
      src={quavers}
      alt="quavers"
      id="1"
      width="270px"
      style={{ background: "transparent", width: width }}
    />,
    <img
      className="note"
      src={semiQuavers}
      alt="semi-quavers"
      id="1"
      style={{ background: "transparent", width: width }}
    />,
    <img
      className="note"
      src={dottedMinim}
      alt="dotted-minim"
      id="3"
      style={{ background: "transparent", width: width }}
    />,
    <img
      className="note"
      src={restAnd}
      alt="quaver-rest/quaver"
      id="1"
      style={{ background: "transparent", width: width }}
    />,
  ];
  const noteChoicesHard = noteChoicesMedium
    .filter((note) => note.props.alt !== "dotted-minim")
    .concat([
      <img
        className="note"
        src={strawBerry}
        alt="quaver,semi-quaver combo"
        id="1"
        style={{ background: "transparent", width: width }}
      />,
      <img
        className="note"
        src={lemonade}
        alt="semi-quaver,quaver combo"
        id="1"
        style={{ background: "transparent", width: width }}
      />,
      <img
        className="note"
        src={triplet}
        alt="triplet"
        id="1"
        style={{ background: "transparent", width: width }}
      />,
    ]);

  const allNotes = noteChoicesEasy
    .concat(noteChoicesMedium)
    .concat(noteChoicesHard);
  const [noteChoices, setNoteChoices] = useState(noteChoicesEasy);

  useEffect(() => {
    if (difficulty === "Easy") {
      setNoteChoices(noteChoicesEasy);
    } else if (difficulty === "Medium") {
      setNoteChoices(noteChoicesMedium);
    } else if (difficulty === "Hard") {
      setNoteChoices(noteChoicesHard);
    }
    if (
      (difficulty === "Medium" && timeSig === "3/4") ||
      (difficulty === "Medium" && timeSig === "5/4")
    ) {
      setNoteChoices(noteChoicesMedium.filter((note) => note.props.id !== "3"));
    }
    if (timeSig === "5/4" && window.outerWidth < 500) {
      setWidth("120%");
    } else {
      setWidth("100%");
    }

    getRandBar();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, timeSig, width]);

  const getRandBar = () => {
    // const current = JSON.stringify(bar);
    let newBar = [];
    let totalNoteValue = 0;

    const getNote = () => {
      const randIndex = Math.floor(Math.random() * noteChoices.length);
      newBar.push(noteChoices[randIndex]);
      totalNoteValue += parseInt(noteChoices[randIndex].props.id);
    };

    if (timeSig === "3/4") {
      while (totalNoteValue < 3) {
        getNote();
      }
      if (totalNoteValue === 4) {
        for (let i = 0; i < newBar.length; i++) {
          if (newBar[i].props.id === "1") {
            newBar.splice(i, 1);
            break;
          } else if (!newBar.forEach((note) => note.props.id === "1")) {
            newBar.splice(
              0,
              1,
              <img
                className="note"
                src={crotchet}
                alt="crotchet"
                id="1"
                style={{ background: "transparent", width: width }}
              />
            );
          }
        }
      }
    } else if (timeSig === "5/4") {
      while (totalNoteValue < 5) {
        getNote();
      }

      if (totalNoteValue === 6) {
        for (let i = 0; i < newBar.length; i++) {
          if (newBar[i].props.id === "1") {
            newBar.splice(i, 1);
            break;
          } else if (!newBar.forEach((note) => note.props.id === "1")) {
            newBar.splice(
              0,
              1,
              <img
                className="note"
                src={crotchet}
                alt="crotchet"
                id="1"
                style={{ background: "transparent", width: width }}
              />
            );
          }
        }
      }
    } else {
      while (totalNoteValue < 4) {
        getNote();
      }

      if (totalNoteValue === 5) {
        for (let x = 0; x < newBar.length; x++) {
          if (newBar[x].props.id === "1") {
            newBar.splice(x, 1);
            break;
          }
        }
      } else if (totalNoteValue === 6) {
        newBar.pop();
        newBar.push(
          <img
            className="note"
            src={crotchet}
            alt="crotchet"
            id="1"
            style={{ background: "transparent", width: width }}
          />
        );
      }
    }

    const cleanUpBar = newBar.map((note) => {
      if (note.props.alt === "minim") {
        return [
          <img
            alt={note.props.alt}
            className={note.props.className}
            src={note.props.src}
            width={width}
            key={nanoid()}
          ></img>,
          <img
            className="note"
            src={blank}
            width={width}
            key={nanoid()}
            alt="blank"
            style={{ background: "transparent" }}
          />,
        ];
      } else if (note.props.alt === "dotted-minim") {
        return [
          <img
            alt={note.props.alt}
            className={note.props.className}
            src={note.props.src}
            width={width}
            key={nanoid()}
          ></img>,
          <img
            className="note"
            src={blank}
            width={width}
            key={nanoid()}
            alt="blank"
            style={{ background: "transparent" }}
          />,
          <img
            className="note"
            src={blank}
            width={width}
            key={nanoid()}
            alt="blank"
            style={{ background: "transparent" }}
          />,
        ];
      } else
        return (
          <img
            alt={note.props.alt}
            className={note.props.className}
            src={note.props.src}
            width={width}
            key={nanoid()}
          ></img>
        );
    });

    const newNotes = cleanUpBar.flat();

    const prevNotesString = bar.map((note) => note.props.alt).toString();
    const newNotesString = newNotes.map((note) => note.props.alt).toString();

    //compare to avoid repeats
    if (prevNotesString === newNotesString) {
      getRandBar();
    } else {
      setBar(newNotes);
    }
  };

  let lightUp;
  let countIn = 0;
  let countDown;

  function toggleMetro(e) {
    let i = 0;
    const noteArray = Array.from(
      document.getElementById("bar").getElementsByClassName("note")
    );
    const buttons = Array.from(document.getElementsByClassName("input"));
    console.log(noteArray.length);

    if (!start && click.readyState === 4) {
      buttons.forEach((button) => button.setAttribute("disabled", " "));
      document.getElementById(
        "metroIcon"
      ).style.animation = `tickTock ${timeInterval}ms linear ${timeInterval}ms infinite`;
      // click.play();
      start = setInterval(() => {
        document.getElementById("countIn").style.visibility = "visible";
        if (countIn < bar.length) {
          countIn++;
        } else {
          document.getElementById("countIn").style.visibility = "hidden";
        }

        click.currentTime = 0;
        click.play();
        document.getElementById("countIn").innerHTML = `${countIn}`;
      }, timeInterval);

      countDown = setTimeout(() => {
        if (!start) {
          return;
        }
        lightUp = setInterval(() => {
          if (i > 0) {
            noteArray[i - 1].style.background = "transparent";
          }
          if (i < noteArray.length) {
            noteArray[i].style.background = "rgb(132 195 255 / 40%)";
            i++;
          }
        }, timeInterval);
      }, timeInterval * noteArray.length);

      if (document.getElementById("repeatBar").checked) {
        countDown = setTimeout(() => {
          let x = 0;

          lightUp = setInterval(() => {
            if (x > 0) {
              noteArray[x - 1].style.background = "transparent";
            }
            if (x < noteArray.length) {
              noteArray[x].style.background = "rgb(132 195 255 / 40%)";
              x++;
            }
          }, timeInterval);
        }, timeInterval * (noteArray.length * 2 - 1) + timeInterval);
      }
    } else {
      clearTimeout(countDown);
      clearInterval(start);
      clearInterval(lightUp);
      countIn = 0;
      countDown = null;
      start = null;
      lightUp = null;
      document.getElementById("countIn").innerHTML = `${countIn}`;
      document.getElementById("countIn").style.visibility = "hidden";
      noteArray.forEach((note) => (note.style.background = "transparent"));
      document.getElementById("metroIcon").style.animation = "none";
      buttons.forEach((button) => button.removeAttribute("disabled"));
    }
  }

  function changeBarLines() {
    if (document.getElementById("repeatBar").checked) {
      document.getElementById("barlineLeft").firstChild.src = repeatBarLeft;
      document.getElementById("barlineRight").firstChild.src = repeatBarRight;
    } else {
      document.getElementById("barlineLeft").firstChild.src = barLine;
      document.getElementById("barlineRight").firstChild.src = barLine;
    }
  }

  return (
    <div id="mainSection">
      <HelpInfo allNotes={allNotes} closeHelp={closeHelp} />
      <Tooltip />
      <span id="metronomeContainer">
        <button id="metronome" onClick={toggleMetro}>
          <img
            id="metroIcon"
            src={metroIcon}
            alt="ticker"
            style={{ animation: "none" }}
          ></img>
        </button>
        <input id="repeatBar" type="checkbox" onChange={changeBarLines}></input>
        Repeat
      </span>
      <div id="countIn">{countIn}</div>
      <div id="barContainer">
        <div id="barlineLeft" className="barLine">
          <img src={barLine} alt="barline"></img>
        </div>
        <div className="timeSigContainer">
          <div>{timeSig[0]}</div>
          <div>{timeSig[2]}</div>
        </div>
        <div id="bar">{bar}</div>
        <div id="barlineRight" className="barLine">
          <img src={barLine} alt="barline"></img>
        </div>
      </div>
      <span id="buttonContainer">
        <button className="input" id="getBar" onClick={getRandBar}>
          Get new rhythm!
        </button>
      </span>
    </div>
  );
}
