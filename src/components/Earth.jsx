import React, { useRef } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { OrbitControls } from '@react-three/drei'
import EarthDayMap from '../assets/8k_earth_daymap.jpg'
// normal - bump map
import EarthNormalMap from '../assets/8k_earth_normal_map.jpg'
// specular - shiny-ness
import EarthSpecularMap from '../assets/8k_earth_specular_map.jpg'
import { TextureLoader } from 'three'

const Earth = (props) => {
  // loads and assigns textures to variables
  const [colorMap, normalMap, specularMap] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
  ])

  //   keeps values between renders
  const earthRef = useRef()

  //   runs every frame - rotates earth and clouds as a proportion of time
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    earthRef.current.rotation.y = elapsedTime / 6
    // cloudsRef.current.rotation.y = elapsedTime / 6
  })

  return (
    <>
      {/* actual earth */}
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 100, 100]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        {/* controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
        />
      </mesh>
      {/* Lighting ambient and pointed */}
      <ambientLight intensity={3} />
      <pointLight color='#f6f3ea' position={[2, 0, 5]} intensity={1.2} />
    </>
  )
}

export default Earth
