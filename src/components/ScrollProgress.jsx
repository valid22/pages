import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="scroll-progress fixed top-0 left-0 right-0 z-[9998]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
