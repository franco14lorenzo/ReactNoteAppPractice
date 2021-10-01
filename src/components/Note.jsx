import React from "react";

const Note = ({note, toggleImportance, deleteNote, icon}) => {
  const label = note.important
  ? "make not important"
  : "make important"
  return(
    <div className="note">
    <li>
      {note.content}      
    </li>
    <button onClick={toggleImportance}>
     {label}
    </button>
    <button onClick={deleteNote}>
     {icon}
    </button>
    </div>
  )
}

export default Note