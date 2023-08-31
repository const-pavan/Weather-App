import React from 'react'
import './App.css'
import { Canvas } from 'react-three-fiber'
import Earth from './components/Earth'
import { Weather } from './components/Weather'

function App() {
  return (
    <div className='App'>
      <div className='globe-container'>
        <Weather />
        <div className='container'>
          <div className='earth'>
            <Canvas style={{ height: '40rem', width: '100%' }}>
              <Earth />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
