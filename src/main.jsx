import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import ToDoList from './pokedex.jsx'
import Board from './canvas.jsx'
import Pokeball3D from './componentepokeball.jsx'
import MusicPlayer from './musica.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToDoList></ToDoList>
    <Pokeball3D></Pokeball3D>
    <Board></Board> 
    <MusicPlayer></MusicPlayer>
  </StrictMode>,
)

{/*esto es un comentario */}

