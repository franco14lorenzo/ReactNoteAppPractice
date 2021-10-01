import './App.css'
import { useEffect, useState, useRef} from 'react';

import {FaFilter, FaSignInAlt, FaTimesCircle, FaTrash} from 'react-icons/fa'

import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification'
import Footer from './components/Footer';
import Login from './components/Login';

import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable';


const App = () => {

  const [notes, setNotes] = useState([]); 
  const [showAll, setShowAll] = useState(true);
  const [textButton, setTextButton] = useState("Only Important");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const loginRef = useRef()


  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {  
      setNotes(initialNotes)
      setLoading(false)
    })
  }, []);

  //Falta implementar el login en el backend
   const handleLogin = async (event) => {
        event.preventDefault()
       
      try {
        const user = await loginService.login({
          username, password,
        })
        setUser(user)
        setUsername('')
        setPassword('')
        loginRef.current.toggleVisibility()

      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
          setUsername('')
          setPassword('')
        }, 5000)
      }
  }

  const notesToShow = showAll && notes
  ? notes 
  : notes.filter((note) => note.important === true) 
  
 

  const changeNotes = () => {
    setShowAll(
      showAll 
      ? false
      : true
    )
    setTextButton(
      textButton === "Only Important"
      ? "View Alls"
      : "Only Important"
    )
  }
 

  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

     noteService
      .update(id, changedNote)
      .then(returnedObject => {
        setNotes(notes.map(note => note.id !== id ? note : returnedObject))
      })
      . catch(err => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)
    noteService.remove(id)
    .then(() => {
         setNotes(notes.filter(n => n.id !== id))
      })
      . catch(err => {
        setErrorMessage(
          `Note '${note.content}' wasn´t already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes)
      })
  }
  
  

  return (  
    <>
      <h1>Notes</h1>

      {errorMessage
      ? <Notification message={errorMessage}/>
      : null
      }

      <Togglable ref={loginRef} buttonLabel={<FaSignInAlt />} cancel={<FaTimesCircle />}>
        <Login 
          handleLogin={handleLogin} 
          username={username} 
          password={password} 
          setUsername={setUsername} 
          setPassword={setPassword}
        />
      </Togglable>
     
      <button onClick={changeNotes}>{textButton} <FaFilter /></button>

    <ul>
      {
        loading ? <p>Cargando...</p>
        : notesToShow.map((note, i) => 
          <Note key={note.id} note={note} toggleImportance={()=>{toggleImportance(note.id)}} icon={<FaTrash/>} deleteNote={()=>{deleteNote(note.id)}} /> 
        )
        }
    </ul>

    
      <NoteForm noteService={noteService} notes={notes} setNotes={setNotes}/> 
    
    
     <Footer />

    </>
  )
}


export default App;
