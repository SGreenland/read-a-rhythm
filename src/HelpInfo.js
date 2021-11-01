import React from 'react'

export default function HelpInfo({allNotes, closeHelp}) {

    let uniqueNoteArray = [
        ...new Map(allNotes.map((item) => [item.props["alt"], item])).values(),
    ];

const helpNotes = uniqueNoteArray.map(note => <div className="helpNotes"><div id="helpNote">{note}</div><div>Note: {note.props.alt}</div>
<div>length: {note.props.id} beat(s)</div></div>)

    return (
        <div id="help" style={{display: "none"}}>
            <span onClick={closeHelp}  id="exitHelp">Close</span>
            {helpNotes}
        </div>
    )
}
