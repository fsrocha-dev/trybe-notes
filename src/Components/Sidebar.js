import { useState } from 'react'
import ReactSidebar from "react-sidebar";
import Header from './Header.js'
import Content from './Content.js'
import { FaHamburger, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'
import { useTheme } from '../Context/ThemeContext.js'
import { useNote } from '../Context/NoteContext.js'

const Sidebar = () => {
  const { colors } = useTheme()
  const { createNote, getLocalStorageNotes, editNote, deleteNote } = useNote()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  //TODO: Fazer um menu de configuração para configurar o docked para true, assim
  //deixando o menu fixo.
  const [sidebarDocked, setSidebarDocked] = useState(false)

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  }

  const buttonStyle = {
    border: "none",
    borderRadius: "4px",
    padding: "8px 14px",
    color: colors.background,
    background: colors.font,
    cursor: "pointer",
    fontSize: "16px"
  }

  const ulMenuStyle = {
    width: "100%",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    padding: "0px"
  }

  const liMenuStyle = {
    minHeight: "40px",
    minWidth: "100%",
    display: "block",
    position: "relative",
  }

  const menuButtonStyle = {
    width: "100%",
    height: "100%",
    color: colors.button.color,
    background: colors.button.background,
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    padding: "7px"
  }

  const removeButtonStyle = {
    border: "none",
    background: colors.iconButton.background,
    color: colors.iconButton.color,
    cursor: "pointer",
    fontSize: "16px",
    position: "absolute",
    right: "0",
    top: "7px"
  }

  const openNote = () => {
    createNote()
    setSidebarOpen(false)
  }

  const getNotes = () => {
    return getLocalStorageNotes() || []
  }

  return <ReactSidebar
    sidebar={
      <aside style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <h1 style={{ color: colors.heading }}>
          <b> <CgNotes /> Trybe Notes</b>
        </h1>
        <p>
          <button onClick={() => openNote()} style={buttonStyle}>
            <FaPlusCircle /> Nova Nota
          </button>
        </p>
        <ul style={ulMenuStyle}>
          {getNotes().map((item) => (
            <li style={liMenuStyle} key={item.id}>
              <button alt="Editar Nota" style={menuButtonStyle} onClick={() => editNote(item.id)}>Nota - {item.id}</button>
              <button alt="Remover Nota" style={removeButtonStyle} onClick={() => deleteNote(item.id)}><FaTrash /></button>
            </li>
          ))}
        </ul>
      </aside>
    }
    open={sidebarOpen}
    docked={sidebarDocked}
    onSetOpen={onSetSidebarOpen}
    styles={{ sidebar: { background: colors.background, padding: '30px', minWidth: '200px' } }}
  >
    <Header>
      <FaHamburger size={26} color="#ffffff" style={{ cursor: "pointer" }} onClick={() => onSetSidebarOpen(true)} />
    </Header>
    <Content />
  </ReactSidebar>
}

export default Sidebar