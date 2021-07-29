import { useTheme } from '../Context/ThemeContext.js'
import { useNote } from '../Context/NoteContext.js'
import ReactMarkdown from 'react-markdown'

const Content = () => {
  const { colors } = useTheme()
  const { note: { id, content }, setNote, hasNote } = useNote()

  const inputContainerStyle = {
    flex: 1
  }

  const markDownStyle = {
    flex: 1,
    color: colors.font
  }

  const textAreaStyle = {
    width: "100%",
    height: "100%",
    fontSize: "18px",
    backgroundColor: colors.content,
    color: colors.font
  }

  const contentStyle = {
    background: colors.content,
    width: "100vw",
    height: "100vh",
    display: "flex",
    gap: "24px"
  }

  const emptyMessageStyle = {
    width: "100vw",
    heigth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-120px",
    color: colors.font,
    margin: "80px"
  }

  return (
    <div style={contentStyle}>
      {hasNote ?
        <>
          <div style={inputContainerStyle}>
            <textarea
              style={textAreaStyle}
              value={content}
              onChange={(e) => setNote({ id: id, content: e.target.value })}
            />
          </div>
          <div style={markDownStyle}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </> :
        <h1 style={emptyMessageStyle}>Não existe nota aberta.</h1>
      }

    </div>
  )
}

export default Content