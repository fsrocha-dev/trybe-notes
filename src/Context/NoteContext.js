import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [note, setNote] = useState({});
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    const updatedInterval = setInterval(() => {
      updateLocalStorageNote(note);
    }, 5000);
    setHasNote(() => true);
    return () => clearInterval(updatedInterval);
  }, [note]);

  const createNote = () => {
    const totalNotes = getLocalStorageNotes();
    let newNote;
    if (totalNotes === null) {
      newNote = {
        id: 1,
        content: '',
      };
    } else {
      newNote = {
        id: totalNotes.reduce((acc, curr) => Math.max(curr.id, acc), 0) + 1,
        content: '',
      };
    }
    createLocalStorageNote(newNote);
    setNote(newNote);
    setHasNote(() => true);
    toast.success('Nota criada com sucesso!');
  };

  const closeNote = () => {
    setHasNote((hasNote) => false);
  };

  const editNote = (id) => {
    const filteredStorageNote = getLocalStorageNotes().find(function (n) {
      return n.id === id;
    });
    setNote(filteredStorageNote);
  };

  const deleteNote = (id) => {
    const newStorageNotes = getLocalStorageNotes().filter(function (n) {
      return n.id !== id;
    });
    localStorage.setItem('notes', JSON.stringify(newStorageNotes));
  };

  const getLocalStorageNotes = () => {
    const allNotesStorage = JSON.parse(localStorage.getItem('notes'));
    return allNotesStorage;
  };

  const createLocalStorageNote = (newNote) => {
    const allNotesStorage = getLocalStorageNotes();
    if (allNotesStorage === null) {
      localStorage.setItem('notes', JSON.stringify([newNote]));
    } else {
      localStorage.setItem(
        'notes',
        JSON.stringify([...allNotesStorage, newNote])
      );
    }
  };

  const updateLocalStorageNote = (noteToUpdate) => {
    const allNotesStorage = getLocalStorageNotes();
    if (allNotesStorage) {
      const updatedNotes = allNotesStorage.map((n) => {
        if (n.id === noteToUpdate.id) {
          return {
            ...n,
            content: note.content,
          };
        }
        return n;
      });
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        setNote,
        hasNote,
        createNote,
        closeNote,
        getLocalStorageNotes,
        editNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export const useNote = () => useContext(NoteContext);
