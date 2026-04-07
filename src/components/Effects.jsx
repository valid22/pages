import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.35}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}
