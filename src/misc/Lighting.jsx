import { Environment, Lightformer, Sky } from "@react-three/drei";
import { useRef } from "react";
import { useGameStore } from "../store";
import { useFrame } from "@react-three/fiber";
import { EnvironmentSphere } from "./EnvironmentSphere";

export const Lighting = () => {
  const directionalLight = useRef(null)
  
  useFrame(() => {

        const playerPosition = useGameStore.getState().playerPosition;
        if (!playerPosition && !directionalLight.current) return;
    
        if(playerPosition){
        directionalLight.current.position.x = playerPosition.x +1.5;
        directionalLight.current.target.position.x = playerPosition.x;
    
        directionalLight.current.position.y = playerPosition.y + 10;
        directionalLight.current.target.position.y = playerPosition.y;
    
        directionalLight.current.position.z = playerPosition.z - 5;
        directionalLight.current.target.position.z = playerPosition.z;
    
        directionalLight.current.target.updateMatrixWorld();
        }
  })
  
  return (
    <>
      <directionalLight
            castShadow
            ref={directionalLight}
            position={[0, 0, 0]}
            intensity={3}
            color={"#FFA28b"}
            shadow-bias={-0.0001}
            shadow-mapSize={[4096, 4096]}
            // layers={1}
            
          >
            <orthographicCamera
              attach="shadow-camera"
              near={1}
              far={1000}
              top={100}
              right={100}
              bottom={-100}
            >
              {/* <Helper type={CameraHelper} /> */}
            </orthographicCamera>
          </directionalLight>
          {/* <directionalLight 
          position={[20, 20, -100]}
          color={"#FFA22B"}
          intensity={10}

          /> */}
            
          <EnvironmentSphere />
    </>
  );
};
