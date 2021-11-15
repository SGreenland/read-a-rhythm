import React from "react";

export default function ToolTip() {
  function closeTip() {
    document.getElementById("toolTip").style.display = "none";
  }
  return (
    <div id="toolTip">
      <button id="closeTooltip" onClick={closeTip}>
        <span style={{ position: "relative", bottom: "1px" }}>X</span>
      </button>
      Click the metronome to practice with strict time! ...You also get a
      count-in!
    </div>
  );
}
