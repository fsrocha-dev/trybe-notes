import './App.css';
import Sidebar from './Components/Sidebar.js';
import { NoteProvider } from './Context/NoteContext.js';
import { ThemeProvider } from './Context/ThemeContext';

function App() {
  return (
    <NoteProvider>
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    </NoteProvider>
  );
}

export default App;
