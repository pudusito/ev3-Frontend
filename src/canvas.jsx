import { Canvas ,useFrame, useThree} from '@react-three/fiber'
import { OrbitControls , useGLTF} from '@react-three/drei'

import './canvas.css'



// Función que mueve la cámara hacia la derecha en cada frame
function CameraMover() {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += 0.01;

    if (camera.position.x > FINAL_X + 3) {
      camera.position.x = INICIO_X;
    }

    camera.lookAt(camera.position.x + 1, 0.5, 0); // Mira hacia adelante
  });
  return null; // no renderiza nada
}

const FINAL_X = 63;   // Última position X (pokemon)
const INICIO_X = 0;  // Punto de reinicio X

function Modelos3D() {

  const pikachu = useGLTF('/Pikachu.glb');
  const charmander = useGLTF('/Charmander.glb');
  const bulbasaur = useGLTF('/Bulbasaur.glb');
  const squirtle = useGLTF('/Squirtle.glb')
  
  const abra = useGLTF('/Abra.glb')
  const bellsprout = useGLTF('/Bellsprout.glb')
  const cubone = useGLTF('/Cubone.glb')
  const diglett = useGLTF('/Diglett.glb')
  const dratini = useGLTF('/Dratini.glb')
  const evee = useGLTF('/Eevee.glb')
  const exeggutor = useGLTF('/Exeggutor.glb')
  const jigglypuff = useGLTF('/Jigglypuff.glb')
  const magikarp = useGLTF('/Magikarp.glb')
  const magnemite = useGLTF('/Magnemite.glb')
  const marill = useGLTF('/Marill.glb')
  const mew = useGLTF('/Mew.glb')
  const poliwag = useGLTF('/Poliwag.glb') 
  const porygon = useGLTF('/Porygon.glb')
  const snorlax = useGLTF('/Snorlax.glb')
  const sudowoodo = useGLTF('/Sudowoodo.glb')
  const victreebel = useGLTF('/Victreebel.glb')
  const weedle = useGLTF('/Weedle.glb')


  return (
    <>

      <primitive object={pikachu.scene} scale={1.5} position={[0, -1, 0, 0]} />
      <primitive object={charmander.scene} scale={1.5} position={[3, -1.5, 0, 0]} />
      <primitive object={bulbasaur.scene} scale={1.5} position={[6, -1.5, 0, 0]} />
      <primitive object={squirtle.scene} scale={4} position={[9, -1, 0, 0]} rotation={[0, 1.5 ,0]}  />


      <primitive object={abra.scene} scale={5} position={[12, -1, 0, 0]} />
      <primitive object={bellsprout.scene} scale={1} position={[15, -1, 0, 0]} />
      <primitive object={cubone.scene} scale={2} position={[18, -1, 0, 0]} />
      <primitive object={diglett.scene} scale={1.5} position={[21, -1.5, 0, 0]} />
      <primitive object={dratini.scene} scale={1} position={[24, 0, 0, 0]} />
      <primitive object={evee.scene} scale={1.5} position={[27, -1, 0, 0]} />
      <primitive object={exeggutor.scene} scale={1.5} position={[30, 1, 0, 0]} />
      <primitive object={jigglypuff.scene} scale={0.7} position={[33, -1.2, 0, 0]} />
      <primitive object={weedle.scene} scale={1} position={[36, -1, 0, 0]} />
      <primitive object={magnemite.scene} scale={1.5} position={[39, -1, 0, 0]} />
      <primitive object={marill.scene} scale={2} position={[42, -1, 0, 0]} />
      <primitive object={mew.scene} scale={2} position={[45, -1, 0, 0]} />
      <primitive object={poliwag.scene} scale={2} position={[48, -1, 0, 0]} />
      <primitive object={porygon.scene} scale={1.5} position={[51, -1, 0, 0]} />
      <primitive object={snorlax.scene} scale={5} position={[54, -0.5, 0, 0]} />
      <primitive object={sudowoodo.scene} scale={1} position={[57, 0, 0, 0]} rotation={[0, Math.PI ,0]} />
      <primitive object={victreebel.scene} scale={0.3} position={[60, -1, 0, 0]} rotation={[0, Math.PI ,0]} />
      <primitive object={magikarp.scene} scale={10} position={[63, -1, 0, 0]} />
    </>
  );
}

// Precarga pokemones iniciales para optimizar carga inicial
useGLTF.preload('/Pikachu.glb');
useGLTF.preload('/Charmander.glb');
useGLTF.preload('/Bulbasaur.glb');
useGLTF.preload('/Squirtle.glb')



function Board() {

  
  return (
    <section className="section-canvas">
      <div className="div-canvas">
        <Canvas id="canvas" camera={{ position: [0, 0, -5], fov: 60 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 2, 5]} />
          {/*<OrbitControls /> {/*Esto te permite mover la cámara alrededor del objeto, como en un visor 3D.*/}
          <CameraMover></CameraMover>
            <Modelos3D></Modelos3D>
         
        </Canvas>
      </div>
    </section>
  );
}

export default Board;
