import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Subject from './pages/Subject'
import Note from './pages/Note'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/subject/:subjectId" element={<Subject />} />
      <Route path="/note/:noteId" element={<Note />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
