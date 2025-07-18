import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function PokeballModel() {
  const ref = useRef();
  const { scene } = useGLTF('/Pokeball.glb');

  // Animación de rotación (metodo)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.5}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload('/Pokeball.glb');

export default function Pokeball3D() {
  return ( //CSS INTERNO DE CANVAS-POKEBALL
    <section //body
      style={{
        position: 'absolute',
        top: '1vh',
        left: '1vw',
   
        width: 'fit-content',
        height: 'fit-content',

        padding: '0',
        margin: '0',
        boxSizing: 'border-box', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}>
      <div //contenedor
        style={{
          position:'relative',
          width: '200px',
          height: '200px',

          //border: '2px solid black',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
          borderRadius: '10px',

        }}>
        <Canvas style={{
            backgroundColor:' rgba(0, 0, 0, 0)',
            width: '70%',
            height: '70%',
  
          }}
        
        
          camera={{ position: [0, 0.3 , 1], fov: 60 }}>  {/* X(W) , Y(H) , Z(DETRAS) */}
          <ambientLight intensity={2} />
          <directionalLight position={[0, 0, 0]} />
          <OrbitControls enableZoom={false} mouseButtons={{
            RIGHT: null, // Desactiva botón derecho
            MIDDLE: null,   // Zoom
            LEFT: 0      // Rotación
            }}/>
            
          <PokeballModel />
        </Canvas>
      </div>
    </section>
  );
}

