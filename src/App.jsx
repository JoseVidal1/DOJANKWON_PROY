import { useState } from 'react'
import './App.css'
import Sidebar from './page/sidebar'; // Cambia a mayúscula S

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <h1>Contenido principal</h1>
      </main>
    </div>
  );
}

export default App;


