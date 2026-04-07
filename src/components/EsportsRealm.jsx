/**
 * THE ARENA — Esports / Personal realm
 * Color palette: Purple / Orange / Pink / Neon
 */
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Text } from '@react-three/drei'
import { GameArtifact, SkillOrb, ZoneLabel } from './Artifact'
import { ESPORTS, SKILLS } from '../data/content'

function NeonFloor() {
  return (
    <group position={[0, -1.5, -62]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#0a0010" emissive="#4B0082" emissiveIntensity={0.04} roughness={1} />
      </mesh>
      <gridHelper args={[50, 50, '#A78BFA', '#1a0030']} />
    </group>
  )
}

function TransitionBeam() {
  // Glowing vertical beam that marks the boundary between realms
  return (
    <group position={[0, 0, -50]}>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 20, 8]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.6} />
      </mesh>
      <Sparkles count={25} scale={[4, 18, 4]} size={1.2} speed={0.4} color="#A78BFA" />
      {/* Horizontal ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.04, 8, 64]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.5} />
      </mesh>
      <Suspense fallback={null}>
        <Text position={[0, 8, 0]} fontSize={0.28} color="#A78BFA" anchorX="center"
          letterSpacing={0.3} material-emissive="#A78BFA" material-emissiveIntensity={3}>
          ENTERING THE ARENA
        </Text>
      </Suspense>
    </group>
  )
}

export default function EsportsRealm() {
  return (
    <group>
      {/* Transition marker */}
      <TransitionBeam />

      {/* ── Lighting ── */}
      <pointLight position={[-8, 6, -56]} color="#A78BFA" intensity={8} distance={25} />
      <pointLight position={[8, 5, -65]} color="#FF5F1F" intensity={6} distance={22} />
      <pointLight position={[0, 4, -75]} color="#A78BFA" intensity={5} distance={20} />

      <Sparkles count={50} scale={[28, 12, 30]} size={0.9} speed={0.2} color="#A78BFA" position={[0, 3, -62]} />
      <Sparkles count={30} scale={[20, 8, 20]} size={0.7} speed={0.15} color="#FF5F1F" position={[0, 2, -70]} />

      <NeonFloor />

      {/* ── Zone title ── */}
      <ZoneLabel title="THE ARENA" sub="ESPORTS · PERSONAL" position={[0, 7, -52]} color="#A78BFA" />

      {/* ── Game artifacts ── */}
      <ZoneLabel title="GAMES" position={[-9, 6, -56]} color="#FF5F1F" />
      <GameArtifact data={ESPORTS[0]} position={[-7, 3, -56]} />    {/* Valorant */}
      <GameArtifact data={ESPORTS[1]} position={[0, 3.5, -60]} />   {/* CS2 */}
      <GameArtifact data={ESPORTS[2]} position={[7, 3, -57]} />     {/* Chess */}

      {/* ── Skills cloud ── */}
      <ZoneLabel title="SKILLS" sub="RADAR" position={[0, 7, -68]} color="#A78BFA" />

      {/* Arrange skills in a rough arc */}
      {SKILLS.map((s, i) => {
        const angle = (i / SKILLS.length) * Math.PI * 1.8 - Math.PI * 0.4
        const r = 6 + (i % 3) * 1.5
        const x = Math.cos(angle) * r
        const z = -70 + Math.sin(angle) * r * 0.5
        const y = 2 + Math.sin(i * 1.3) * 2
        return <SkillOrb key={s.name} skill={s} position={[x, y, z]} index={i} />
      })}

      {/* ── About section ── */}
      <Suspense fallback={null}>
        <ZoneLabel title="ABOUT" position={[0, 7, -78]} color="#00FF87" />
        <Text position={[0, 4, -79]} fontSize={0.28} color="#ffffff" anchorX="center" maxWidth={14}
          textAlign="center" material-emissive="#ffffff" material-emissiveIntensity={0.2}>
          Building intelligent systems by day.
        </Text>
        <Text position={[0, 3.2, -79]} fontSize={0.28} color="#A78BFA" anchorX="center" maxWidth={14}
          textAlign="center" material-emissive="#A78BFA" material-emissiveIntensity={1.5}>
          Competing and reading patterns at night.
        </Text>
        <Text position={[0, 2.2, -79]} fontSize={0.18} color="rgba(200,200,200,0.7)" anchorX="center"
          maxWidth={16} textAlign="center">
          La Jolla, CA · UCSD MS Analytics · hi@itsdote.tech
        </Text>
      </Suspense>
    </group>
  )
}
