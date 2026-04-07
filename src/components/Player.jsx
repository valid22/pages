import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PORTAL_POS = new THREE.Vector3(0, 1.5, -14)
const SPEED = 6
const BOUND_X = 12
const BOUND_Z_MIN = -16
const BOUND_Z_MAX = 5

export default function Player({ onTransition, onKeysChange }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const keys = useRef({})
  const triggered = useRef(false)
  const { camera } = useThree()

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true
      onKeysChange?.({ ...keys.current })
    }
    const up = (e) => {
      keys.current[e.code] = false
      onKeysChange?.({ ...keys.current })
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [onKeysChange])

  useFrame((_, delta) => {
    if (!meshRef.current || triggered.current) return

    const k = keys.current
    let dx = 0, dz = 0
    if (k.KeyW || k.ArrowUp)    dz -= SPEED * delta
    if (k.KeyS || k.ArrowDown)  dz += SPEED * delta
    if (k.KeyA || k.ArrowLeft)  dx -= SPEED * delta
    if (k.KeyD || k.ArrowRight) dx += SPEED * delta

    const nx = Math.max(-BOUND_X, Math.min(BOUND_X, meshRef.current.position.x + dx))
    const nz = Math.max(BOUND_Z_MIN, Math.min(BOUND_Z_MAX, meshRef.current.position.z + dz))
    meshRef.current.position.x = nx
    meshRef.current.position.z = nz

    // Rotate ring
    if (ringRef.current) ringRef.current.rotation.y += delta * 1.5

    // Camera follow (behind and above player)
    const target = new THREE.Vector3(nx, meshRef.current.position.y + 4.5, nz + 7)
    camera.position.lerp(target, 0.07)
    camera.lookAt(new THREE.Vector3(nx, meshRef.current.position.y + 0.5, nz - 1))

    // Portal proximity trigger
    if (!triggered.current && meshRef.current.position.distanceTo(PORTAL_POS) < 2.8) {
      triggered.current = true
      onTransition()
    }
  })

  return (
    <group ref={meshRef} position={[0, 0.5, 3]}>
      {/* Main orb */}
      <mesh>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00D4FF"
          emissiveIntensity={1.2}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>
      {/* Orbit ring */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[0.6, 0.025, 8, 64]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={4} />
        </mesh>
      </group>
      {/* Ground shadow glow */}
      <mesh position={[0, -0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
