import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sparkles } from '@react-three/drei'

function PulsingNode({ position, color, size = 0.5 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15
      ref.current.scale.setScalar(s)
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} roughness={0.2} metalness={0.5} />
    </mesh>
  )
}

function ConnectionLine({ from, to, color }) {
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]
  const len = Math.sqrt(
    (to[0] - from[0]) ** 2 + (to[1] - from[1]) ** 2 + (to[2] - from[2]) ** 2
  )
  const dir = [(to[0] - from[0]) / len, (to[1] - from[1]) / len, (to[2] - from[2]) / len]
  const angle = Math.atan2(dir[0], dir[2])

  return (
    <mesh position={mid} rotation={[0, angle, 0]}>
      <boxGeometry args={[0.015, 0.015, len]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

const CONTACT_NODES = [
  { label: 'EMAIL',    value: 'hi@itsdote.tech',              href: 'mailto:hi@itsdote.tech',          color: '#00FF87', offset: [-5.5, 2, -90] },
  { label: 'LINKEDIN', value: 'linkedin.com/in/dote10110',    href: 'https://linkedin.com/in/dote10110', color: '#00D4FF', offset: [0, 3.5, -92] },
  { label: 'WEBSITE',  value: 'itsdote.tech',                  href: 'https://itsdote.tech',             color: '#FF5F1F', offset: [5.5, 2, -90] },
]

const HUB_CENTER = [0, 1.5, -88]

export default function ContactHub() {
  return (
    <group>
      <pointLight position={[0, 8, -88]} color="#00FF87" intensity={10} distance={25} />
      <Sparkles count={40} scale={[16, 10, 16]} size={1.5} speed={0.3} color="#00FF87" position={[0, 3, -88]} />

      <Suspense fallback={null}>
        <Text position={[0, 7.5, -86]} fontSize={1.1} color="#00FF87" anchorX="center"
          letterSpacing={0.2} material-emissive="#00FF87" material-emissiveIntensity={2}>
          CONTACT
        </Text>
        <Text position={[0, 6.2, -86]} fontSize={0.3} color="#ffffff" anchorX="center"
          letterSpacing={0.3} material-emissive="#ffffff" material-emissiveIntensity={0.3}>
          ESTABLISH CONNECTION
        </Text>

        <Text position={[0, 4.8, -87]} fontSize={0.22} color="rgba(200,200,200,0.6)" anchorX="center"
          maxWidth={14} textAlign="center">
          Available for full-time roles, research, and select freelance projects.
        </Text>
      </Suspense>

      {/* Central hub node */}
      <PulsingNode position={HUB_CENTER} color="#00FF87" size={0.55} />

      {/* Outer ring */}
      <mesh position={HUB_CENTER} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 8, 64]} />
        <meshBasicMaterial color="#00FF87" transparent opacity={0.4} />
      </mesh>

      {/* Contact nodes */}
      {CONTACT_NODES.map((n, i) => (
        <group key={i}>
          <PulsingNode position={n.offset} color={n.color} size={0.32} />
          <ConnectionLine from={HUB_CENTER} to={n.offset} color={n.color} />
          <Suspense fallback={null}>
            <Text position={[n.offset[0], n.offset[1] + 0.8, n.offset[2]]}
              fontSize={0.22} color={n.color} anchorX="center"
              material-emissive={n.color} material-emissiveIntensity={2}>
              {n.label}
            </Text>
            <Text position={[n.offset[0], n.offset[1] + 0.46, n.offset[2]]}
              fontSize={0.14} color="#ffffff" anchorX="center"
              material-emissive="#ffffff" material-emissiveIntensity={0.2}>
              {n.value}
            </Text>
          </Suspense>
        </group>
      ))}

      {/* Availability badge */}
      <Suspense fallback={null}>
        <Text position={[0, 0, -87]} fontSize={0.2} color="#00FF87" anchorX="center"
          letterSpacing={0.3} material-emissive="#00FF87" material-emissiveIntensity={3}>
          ● AVAILABLE FOR OPPORTUNITIES
        </Text>
      </Suspense>
    </group>
  )
}
