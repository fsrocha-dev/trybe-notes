import Switch from "react-switch";
import { useTheme } from '../Context/ThemeContext.js'
import { useNote } from '../Context/NoteContext.js'
import { FaMoon, FaSun } from 'react-icons/fa'

const Header = ({ children }) => {
  const { theme, setTheme, colors } = useTheme()
  const { closeNote, hasNote } = useNote()

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: colors.header,
    padding: "3vh"
  }

  const buttonStyle = {
    border: "none",
    borderRadius: "4px",
    padding: "8px 14px",
    color: colors.background,
    background: colors.font,
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "15px",
  }

  const handleChangeTheme = () => {
    setTheme((theme) => theme === 'light' ? 'dark' : 'light')
  }

  return <header style={headerStyles}>
    {children}
    <div>
      {hasNote &&
        <button onClick={() => closeNote()} style={buttonStyle}>
          Fechar nota
        </button>
      }

      <Switch
        offColor="#333333"
        onColor="#f3f3f3"
        onHandleColor="#333333"
        onChange={handleChangeTheme}
        uncheckedIcon={<FaMoon size={18} color="#f0c420" style={{ margin: "4px 0px 0px 4px" }} />}
        checkedIcon={<FaSun size={18} color="#f0c420" style={{ margin: "5px 0px 0px 5px" }} />}
        checked={(theme === 'light' ? false : true)}
      />
    </div>

  </header>
}

export default Header