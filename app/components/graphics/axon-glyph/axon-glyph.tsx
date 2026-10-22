import { computed, defineComponent, type PropType } from 'vue'

import s from './axon-glyph.module.css'
import { GLYPH_VIEW_BOX } from './constants'
import type { TAxonGlyph } from './types'

export const AxonGlyph = defineComponent({
    name: 'AxonGlyph',
    props: {
        glyph: { type: Object as PropType<TAxonGlyph>, default: undefined },
        active: { type: Boolean, default: undefined },
    },
    setup(props) {
        const { target, isArmed, isRevealed } = useReveal()
        const isControlled = computed(() => props.active !== undefined)
        const isActive = computed(() => (
            isControlled.value ? props.active : isArmed.value && isRevealed.value
        ))

        return () => {
            if (!props.glyph) return null
            const { site, ticks, dots, surfaces } = props.glyph

            return (
                <div
                    ref={isControlled.value ? undefined : target}
                    class={[isActive.value && s.active]}
                    aria-hidden="true"
                >
                    <svg class={s.canvas} viewBox={GLYPH_VIEW_BOX} fill="none">
                        {site && <path class={s.guide} d={site} />}
                        {ticks && <path class={s.guide} d={ticks} />}
                        {dots && <path class={s.dots} d={dots} />}
                        <g class={s.model}>
                            <g class={s.arrival}>
                                {surfaces.map((layer, index) => (
                                    <path class={[s.surface, s[layer.tone]]} d={layer.path} key={index} />
                                ))}
                            </g>
                        </g>
                    </svg>
                </div>
            )
        }
    },
})
