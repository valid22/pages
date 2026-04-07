import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Background() {
  const mountRef = useRef()

  useEffect(() => {
    const el = mountRef.current
    let W = window.innerWidth
    let H = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 300)
    camera.position.z = 8

    // ── Primary particle field ─────────────────────────────────────────────
    const N = 4000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const sizes = new Float32Array(N)

    // Cyan: #00D4FF = 0,0.831,1
    // Purple: #A78BFA = 0.655,0.545,0.98
    // Orange: #FF5F1F = 1,0.373,0.122
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18

      const r = Math.random()
      if (r < 0.55) {          // cyan — majority
        col[i*3] = 0; col[i*3+1] = 0.83; col[i*3+2] = 1
      } else if (r < 0.78) {   // purple
        col[i*3] = 0.655; col[i*3+1] = 0.545; col[i*3+2] = 0.98
      } else if (r < 0.90) {   // white
        col[i*3] = 0.9; col[i*3+1] = 0.95; col[i*3+2] = 1
      } else {                  // orange accent
        col[i*3] = 1; col[i*3+1] = 0.373; col[i*3+2] = 0.122
      }
      sizes[i] = 0.02 + Math.random() * 0.05
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // ── Subtle grid lines (a few horizontal / vertical streaks) ─────────────
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00D4FF,
      transparent: true,
      opacity: 0.04,
    })
    for (let i = 0; i < 12; i++) {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-20, (i - 6) * 2.8, 0),
        new THREE.Vector3(20, (i - 6) * 2.8, 0),
      ])
      scene.add(new THREE.Line(lineGeo, lineMat))
    }

    // ── Scroll tracking ────────────────────────────────────────────────────
    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ────────────────────────────────────────────────────────────
    let raf
    let t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.0005

      // Very slow drift
      points.rotation.y = t * 0.12
      points.rotation.x = t * 0.04

      // Parallax on scroll
      camera.position.y = -scrollY * 0.0015
      camera.position.z = 8 - scrollY * 0.001

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} id="bg-canvas" />
}
