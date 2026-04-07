import { useRef, Suspense } from 'react'
import { Text, Stars, Sparkles, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Player from './Player'

function TronFloor() {
  return (
    <group>
      {/* Base dark plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -6]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#000814" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Grid lines */}
      <gridHelper
        args={[60, 60, '#00D4FF', '#001A2C']}
        position={[0, 0, -6]}
      />
    </group>
  )
}

function Portal({ onTransition }) {
  const outerRef = useRef()
  const innerRef = useRef()

  useFrame((_, delta) => {
    if (outerRef.current) outerRef.current.rotation.z += delta * 0.6
    if (innerRef.current) innerRef.current.rotation.z -= delta * 1.1
  })

  return (
    <group position={[0, 1.5, -14]}>
      {/* Outer ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[1.9, 0.055, 16, 120]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={4} />
      </mesh>
      {/* Inner ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.4, 0.03, 12, 80]} />
        <meshStandardMaterial color="#ffffff" emissive="#00D4FF" emissiveIntensity={2} />
      </mesh>
      {/* Portal fill (semi-transparent) */}
      <mesh>
        <circleGeometry args={[1.85, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.06} side={2} />
      </mesh>
      {/* Particles inside portal */}
      <Sparkles count={30} scale={3.2} size={1.5} speed={0.5} color="#00D4FF" />
      {/* ENTER label */}
      <Suspense fallback={null}>
        <Text
          position={[0, 2.8, 0]}
          fontSize={0.28}
          color="#00D4FF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.3}
          material-emissive="#00D4FF"
          material-emissiveIntensity={3}
        >
          [ ENTER WORLD ]
        </Text>
      </Suspense>
      {/* Ground glow under portal */}
      <mesh position={[0, -1.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function FloatingName() {
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group position={[0, 4.5, -5]}>
        <Suspense fallback={null}>
          {/* Main name */}
          <Text
            fontSize={1.6}
            color="white"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.18}
            material-emissive="white"
            material-emissiveIntensity={0.4}
          >
            VIGNESHWARAN
          </Text>
          {/* Subtitle */}
          <Text
            position={[0, -1.3, 0]}
            fontSize={0.32}
            color="#00D4FF"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.35}
            material-emissive="#00D4FF"
            material-emissiveIntensity={2.5}
          >
            AI/ML ENGINEER · ESPORTS PLAYER
          </Text>
          {/* Micro label */}
          <Text
            position={[0, -1.85, 0]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.25}
            material-emissive="#ffffff"
            material-emissiveIntensity={0.3}
          >
            LA JOLLA, CA · UCSD MS ANALYTICS
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

function CornerAccents() {
  // Decorative floating crystals in the corners of the map
  const positions = [
    [-10, 1.5, -2], [10, 2, -2],
    [-10, 1, -10], [10, 1.5, -10],
    [-6, 3, -6], [6, 2.5, -8],
  ]
  const refs = useRef([])

  useFrame((state) => {
    refs.current.forEach((r, i) => {
      if (r) {
        r.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.5
        r.rotation.y += 0.008
      }
    })
  })

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} ref={el => refs.current[i] = el} position={pos}>
          <octahedronGeometry args={[0.25 + (i % 3) * 0.08]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={1.5}
            transparent
            opacity={0.5}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </>
  )
}

export default function IntroScene({ onTransition, onKeysChange }) {
  return (
    <>
      {/* Background */}
      <color attach="background" args={['#000510']} />
      <fog attach="fog" args={['#000510', 14, 55]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 10, 0]} color="#00D4FF" intensity={3} distance={30} />
      <pointLight position={[0, 3, -14]} color="#00D4FF" intensity={8} distance={12} />
      <pointLight position={[-8, 4, -6]} color="#1a3aff" intensity={2} distance={15} />
      <pointLight position={[8, 4, -6]} color="#00D4FF" intensity={2} distance={15} />

      <Stars radius={80} depth={50} count={4000} factor={3} saturation={0} fade speed={0.8} />

      <TronFloor />
      <FloatingName />
      <Portal onTransition={onTransition} />
      <CornerAccents />

      <Player onTransition={onTransition} onKeysChange={onKeysChange} />
    </>
  )
}
