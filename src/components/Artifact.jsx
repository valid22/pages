/**
 * Base interactable artifact component.
 * Wraps any 3D geometry with hover glow, float animation, and click → InfoPanel.
 */
import { useRef, useState, useContext, Suspense } from 'react'
import { Float, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { WorldContext } from '../WorldContext'

// ─── Project gem (icosahedron) ───────────────────────────────────────────────
export function ProjectGem({ data, position }) {
  const { setSelected } = useContext(WorldContext)
  const [hov, setHov] = useState(false)
  const meshRef = useRef()

  useFrame((_, d) => {
    if (meshRef.current) meshRef.current.rotation.y += d * (hov ? 1.5 : 0.4)
  })

  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.1}>
      <group position={position}>
        <mesh ref={meshRef}
          onPointerOver={() => { setHov(true); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { setHov(false); document.body.style.cursor = 'none' }}
          onClick={() => setSelected({ type: 'project', data, onClose: () => setSelected(null) })}
          scale={hov ? 1.25 : 1}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hov ? 4 : 1.2}
            roughness={0.1}
            metalness={0.8}
            wireframe={hov}
          />
        </mesh>
        {/* Solid inner */}
        {hov && (
          <mesh scale={0.7}>
            <icosahedronGeometry args={[0.55, 0]} />
            <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={2} transparent opacity={0.4} />
          </mesh>
        )}
        <Suspense fallback={null}>
          <Text position={[0, 1.1, 0]} fontSize={0.22} color={data.color} anchorX="center"
            material-emissive={data.color} material-emissiveIntensity={hov ? 3 : 1.5}>
            {data.name.length > 18 ? data.name.slice(0, 18) + '…' : data.name}
          </Text>
          <Text position={[0, 0.78, 0]} fontSize={0.13} color="#ffffff" anchorX="center"
            material-emissive="#ffffff" material-emissiveIntensity={0.3}>
            {data.id} · {data.year}
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

// ─── Experience terminal (box) ────────────────────────────────────────────────
export function ExpTerminal({ data, position }) {
  const { setSelected } = useContext(WorldContext)
  const [hov, setHov] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0}>
      <group position={position} ref={groupRef}>
        <mesh
          onPointerOver={() => { setHov(true); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { setHov(false); document.body.style.cursor = 'none' }}
          onClick={() => setSelected({ type: 'experience', data, onClose: () => setSelected(null) })}>
          <boxGeometry args={[1.1, 0.75, 0.12]} />
          <meshStandardMaterial
            color={hov ? '#ffffff' : data.color}
            emissive={data.color}
            emissiveIntensity={hov ? 3 : 0.8}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>
        {/* Screen lines */}
        {[0.18, 0.06, -0.06].map((y, i) => (
          <mesh key={i} position={[0, y, 0.065]}>
            <boxGeometry args={[0.7 - i * 0.1, 0.02, 0.01]} />
            <meshBasicMaterial color={data.color} transparent opacity={hov ? 0.9 : 0.5} />
          </mesh>
        ))}
        <Suspense fallback={null}>
          <Text position={[0, 1.1, 0]} fontSize={0.2} color={data.color} anchorX="center"
            material-emissive={data.color} material-emissiveIntensity={hov ? 3 : 1.5}>
            {data.company}
          </Text>
          <Text position={[0, 0.8, 0]} fontSize={0.13} color="#ffffff" anchorX="center"
            material-emissive="#ffffff" material-emissiveIntensity={0.3}>
            {data.period}
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

// ─── Education crystal (double pyramid) ──────────────────────────────────────
export function EduCrystal({ data, position }) {
  const { setSelected } = useContext(WorldContext)
  const [hov, setHov] = useState(false)
  const ref = useRef()

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.35
  })

  return (
    <Float speed={1.5} floatIntensity={0.7} rotationIntensity={0.2}>
      <group position={position}>
        <mesh ref={ref}
          onPointerOver={() => { setHov(true); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { setHov(false); document.body.style.cursor = 'none' }}
          onClick={() => setSelected({ type: 'education', data, onClose: () => setSelected(null) })}
          scale={hov ? 1.2 : 1}>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hov ? 5 : 1.5}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.85}
          />
        </mesh>
        <Suspense fallback={null}>
          <Text position={[0, 1.1, 0]} fontSize={0.2} color={data.color} anchorX="center"
            material-emissive={data.color} material-emissiveIntensity={hov ? 3 : 2}>
            {data.school}
          </Text>
          <Text position={[0, 0.82, 0]} fontSize={0.12} color="#ffffff" anchorX="center"
            material-emissive="#ffffff" material-emissiveIntensity={0.3}>
            {data.degree.split(' ').slice(0, 3).join(' ')}
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

// ─── Esports game artifact (torus knot) ──────────────────────────────────────
export function GameArtifact({ data, position }) {
  const { setSelected } = useContext(WorldContext)
  const [hov, setHov] = useState(false)
  const ref = useRef()

  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.4
      ref.current.rotation.z += d * 0.2
    }
  })

  return (
    <Float speed={1.8} floatIntensity={1} rotationIntensity={0.3}>
      <group position={position}>
        <mesh ref={ref}
          onPointerOver={() => { setHov(true); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { setHov(false); document.body.style.cursor = 'none' }}
          onClick={() => setSelected({ type: 'game', data, onClose: () => setSelected(null) })}
          scale={hov ? 1.3 : 1}>
          <torusKnotGeometry args={[0.42, 0.13, 100, 8, 2, 3]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hov ? 4 : 1.8}
            roughness={0.15}
            metalness={0.6}
            wireframe={hov}
          />
        </mesh>
        <Suspense fallback={null}>
          <Text position={[0, 1.1, 0]} fontSize={0.24} color={data.color} anchorX="center"
            material-emissive={data.color} material-emissiveIntensity={hov ? 3 : 2}>
            {data.game}
          </Text>
          <Text position={[0, 0.78, 0]} fontSize={0.13} color="#ffffff" anchorX="center">
            {data.role}
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

// ─── Skill orb ────────────────────────────────────────────────────────────────
export function SkillOrb({ skill, position, index }) {
  const ref = useRef()
  const colors = ['#00D4FF', '#A78BFA', '#00FF87', '#FF5F1F', '#FF6B9D']
  const color = colors[index % colors.length]

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.1)
    }
  })

  const size = 0.15 + (skill.level / 100) * 0.35

  return (
    <Float speed={1 + index * 0.2} floatIntensity={0.5} rotationIntensity={0}>
      <group position={position}>
        <mesh ref={ref}>
          <sphereGeometry args={[size, 20, 20]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} roughness={0.2} metalness={0.5} />
        </mesh>
        <Suspense fallback={null}>
          <Text position={[0, size + 0.35, 0]} fontSize={0.14} color={color} anchorX="center"
            material-emissive={color} material-emissiveIntensity={2}>
            {skill.name.split('/')[0].trim()}
          </Text>
          <Text position={[0, size + 0.12, 0]} fontSize={0.1} color="white" anchorX="center">
            {skill.level}
          </Text>
        </Suspense>
      </group>
    </Float>
  )
}

// ─── Zone label ───────────────────────────────────────────────────────────────
export function ZoneLabel({ title, sub, position, color = '#00D4FF' }) {
  return (
    <group position={position}>
      <Suspense fallback={null}>
        <Text fontSize={1.1} color={color} anchorX="center" letterSpacing={0.2}
          material-emissive={color} material-emissiveIntensity={1.5}>
          {title}
        </Text>
        {sub && (
          <Text position={[0, -0.9, 0]} fontSize={0.3} color="#ffffff" anchorX="center"
            letterSpacing={0.3} material-emissive="#ffffff" material-emissiveIntensity={0.3}>
            {sub}
          </Text>
        )}
      </Suspense>
    </group>
  )
}
