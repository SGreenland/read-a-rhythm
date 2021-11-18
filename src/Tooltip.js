import React from "react";

export default function ToolTip() {
  function closeTip() {
    document.getElementById("toolTip").style.display = "none";
  }
  return (
    <div id="toolTip">
      <div>
        Click the metronome to practice with strict time! ...You also get a
        count-in!
      </div>
      <button id="closeTooltip" onClick={closeTip}>
        X
      </button>
    </div>
  );
}
