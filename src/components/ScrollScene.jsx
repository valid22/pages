import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll, Stars } from '@react-three/drei'
import * as THREE from 'three'
import ProfRealm from './ProfRealm'
import EsportsRealm from './EsportsRealm'
import ContactHub from './ContactHub'

// ── Camera path through the world ─────────────────────────────────────────────
// Professional realm: z from 0 to -48
// Esports realm: z from -50 to -82
// Contact: z around -88
const CAM_PTS = [
  [0,   3,  18],   // 0.0  — entrance
  [-2,  4,   8],   // 0.1  — looking in
  [-7,  4,  -6],   // 0.2  — education left
  [ 8,  3, -12],   // 0.3  — education right
  [-7,  3, -18],   // 0.35 — education 3rd
  [ 7,  4, -22],   // 0.4  — experience 1
  [-6,  3, -28],   // 0.45 — experience 2
  [-2,  4, -34],   // 0.5  — entering projects
  [ 6,  3, -38],   // 0.55 — projects wide
  [-4,  5, -44],   // 0.6  — projects sweep
  [ 0,  3, -50],   // 0.65 — transition beam
  [ 6,  4, -56],   // 0.7  — esports entrance
  [-4,  4, -63],   // 0.75 — games
  [ 0,  5, -70],   // 0.8  — skills cloud
  [ 0,  4, -78],   // 0.85 — about
  [ 0,  3, -84],   // 0.9  — approaching contact
  [ 0,  3, -89],   // 1.0  — contact hub
]

function CameraRig({ onScrollChange }) {
  const scroll = useScroll()
  const camCurve = useMemo(
    () => new THREE.CatmullRomCurve3(CAM_PTS.map(p => new THREE.Vector3(...p)), false, 'catmullrom', 0.5),
    []
  )
  const quatTarget = useRef(new THREE.Quaternion())
  const posTarget = useRef(new THREE.Vector3(0, 3, 18))

  useFrame((state) => {
    const t = scroll.offset
    onScrollChange?.(t)

    // Sample camera position from curve
    const newPos = camCurve.getPoint(t)
    posTarget.current.lerp(newPos, 0.055)
    state.camera.position.copy(posTarget.current)

    // Look slightly ahead
    const aheadT = Math.min(t + 0.04, 1)
    const lookAt = camCurve.getPoint(aheadT)

    // Build target quaternion
    const m = new THREE.Matrix4().lookAt(state.camera.position, lookAt, new THREE.Vector3(0, 1, 0))
    quatTarget.current.setFromRotationMatrix(m)
    state.camera.quaternion.slerp(quatTarget.current, 0.06)
  })

  return null
}

export default function ScrollScene({ onScrollChange }) {
  return (
    <ScrollControls pages={9} damping={0.35} distance={1}>
      <color attach="background" args={['#000308']} />
      <fog attach="fog" args={['#000308', 30, 120]} />

      <ambientLight intensity={0.08} />
      <Stars radius={200} depth={80} count={7000} factor={4} saturation={0} fade speed={0.3} />

      <CameraRig onScrollChange={onScrollChange} />
      <ProfRealm />
      <EsportsRealm />
      <ContactHub />
    </ScrollControls>
  )
}
