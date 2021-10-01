import { useState, useRef } from "react";

import {FaPlusCircle, FaTimesCircle} from 'react-icons/fa'


import Togglable from "./Togglable";



const NoteForm = ({notes, setNotes, noteService}) => {
    const [newNote, setNewNote] = useState("Escribe aqui tu nota...");

    const noteFormRef = useRef()

    const handleOnChange = (event) => {
        setNewNote(event.target.value)
    }
     const addNote = (event) => {
    event.preventDefault()
    const objectNote = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }
    
    setNewNote("Escribe otra nota...")
    noteService
      .create(objectNote)
      .then((returnedObject) => {
        setNotes(notes.concat(returnedObject))
      })
    
      noteFormRef.current.toggleVisibility()

  }
    return (
        <Togglable buttonLabel={<FaPlusCircle/>} cancel={<FaTimesCircle />} ref={noteFormRef}>
         <form onSubmit={addNote}>
             <h3>Create a new note</h3>
            <input type="text" value={newNote} onChange={handleOnChange}/>
            <button type="submit">Agregar</button>
        </form>
        </Togglable>
    )
}

export default NoteForm