/**
 * THE LAB — Professional realm
 * Floating islands for Education, Experience, Projects
 * Color palette: Cyan / Blue / White
 */
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import { ProjectGem, ExpTerminal, EduCrystal, ZoneLabel } from './Artifact'
import { PROJECTS, EXPERIENCE, EDUCATION } from '../data/content'

function FloatingIsland({ position, size = [4, 0.2, 3], color = '#001A2C' }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} emissive="#00D4FF" emissiveIntensity={0.08} roughness={0.8} metalness={0.3} />
      </mesh>
      {/* Glowing edge */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[size[0] + 0.05, 0.05, size[2] + 0.05]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function AmbientParticles() {
  return (
    <>
      <Sparkles count={60} scale={[30, 10, 40]} size={0.8} speed={0.15} color="#00D4FF" position={[0, 2, -25]} />
      <Sparkles count={30} scale={[20, 8, 20]} size={0.5} speed={0.1} color="#ffffff" position={[0, 4, -15]} />
    </>
  )
}

export default function ProfRealm() {
  return (
    <group>
      {/* ── Zone title ── */}
      <ZoneLabel title="THE LAB" sub="PROFESSIONAL · ACADEMIC" position={[0, 6, 2]} color="#00D4FF" />

      {/* ── Ambient ── */}
      <pointLight position={[-8, 8, -10]} color="#00D4FF" intensity={6} distance={30} />
      <pointLight position={[8, 6, -25]} color="#1a6fff" intensity={5} distance={25} />
      <pointLight position={[0, 5, -38]} color="#00D4FF" intensity={4} distance={25} />
      <AmbientParticles />

      {/* ── Education islands ── */}
      <ZoneLabel title="EDUCATION" position={[-10, 6, -8]} color="#00D4FF" />
      <FloatingIsland position={[-8, -0.5, -8]} size={[5, 0.25, 4]} />
      <EduCrystal data={EDUCATION[0]} position={[-8.5, 1.5, -7]} />   {/* UCSD */}

      <FloatingIsland position={[9, -0.5, -12]} size={[4.5, 0.2, 3.5]} />
      <EduCrystal data={EDUCATION[1]} position={[9, 1.5, -11.5]} />   {/* IIT */}

      <FloatingIsland position={[-9, -0.5, -18]} size={[4, 0.2, 3]} />
      <EduCrystal data={EDUCATION[2]} position={[-9, 1.5, -17.5]} />  {/* SASTRA */}

      {/* ── Experience terminals ── */}
      <ZoneLabel title="EXPERIENCE" position={[8, 6, -22]} color="#00D4FF" />
      <FloatingIsland position={[7, -0.5, -22]} size={[5, 0.25, 4]} color="#001226" />
      <ExpTerminal data={EXPERIENCE[0]} position={[7, 2, -21.5]} />   {/* RSKD */}

      <FloatingIsland position={[-7, -0.5, -28]} size={[4.5, 0.2, 3.5]} color="#001226" />
      <ExpTerminal data={EXPERIENCE[1]} position={[-7, 2, -27.5]} />  {/* Zoho */}

      {/* ── Projects cluster ── */}
      <ZoneLabel title="PROJECTS" sub="SHIPPED SYSTEMS" position={[0, 7, -35]} color="#00D4FF" />

      {/* Two rows of project gems */}
      {/* Row 1 */}
      <ProjectGem data={PROJECTS[0]} position={[-9, 3, -35]} />
      <ProjectGem data={PROJECTS[1]} position={[-3, 3.5, -37]} />
      <ProjectGem data={PROJECTS[2]} position={[3, 3, -35]} />
      {/* Row 2 */}
      <ProjectGem data={PROJECTS[3]} position={[-6, 2, -42]} />
      <ProjectGem data={PROJECTS[4]} position={[0, 4, -44]} />
      <ProjectGem data={PROJECTS[5]} position={[7, 2.5, -40]} />

      {/* Decorative background islands */}
      <FloatingIsland position={[0, -2, -38]} size={[18, 0.15, 14]} color="#000d1a" />
    </group>
  )
}
