import { computed, defineComponent } from 'vue'

import s from './axon-band.module.css'
import {
    BAND_AXIS,
    BAND_BASE,
    BAND_BASE_GRID,
    BAND_BASE_TICKS,
    BAND_MODULES,
    BAND_VIEW_BOX,
} from './constants'

export const AxonBand = defineComponent({
    name: 'AxonBand',

    setup() {
        const { offsetX, offsetY } = usePointerParallax()
        const { target, progress } = useScrollProgress('exit')

        const bandStyle = computed(() => ({
            '--pointer-x': offsetX.value.toFixed(3),
            '--pointer-y': offsetY.value.toFixed(3),
            '--explode': progress.value.toFixed(3),
        }))

        return () => (
            <div ref={target} class={s.root} style={bandStyle.value} aria-hidden="true">
                <svg class={s.canvas} viewBox={BAND_VIEW_BOX} fill="none">
                    <path class={s.axis} d={BAND_AXIS} pathLength="1" />

                    <g class={s.foundation}>
                        <path class={s.baseFill} d={BAND_BASE} />
                        <path class={s.baseGrid} d={BAND_BASE_GRID} pathLength="1" />
                        <path class={s.baseOutline} d={BAND_BASE} pathLength="1" />
                        <path class={s.ticks} d={BAND_BASE_TICKS} />
                    </g>

                    {BAND_MODULES.map((module, index) => (
                        <g transform={`translate(${module.offsetX} ${module.offsetY})`} key={module.id}>
                            <g class={s.module} style={{ '--depth': index }}>
                                <g class={s.moduleBody}>
                                    <path class={s.moduleFill} d={module.volume} />
                                    {module.inner && (
                                        <path class={s.moduleInner} d={module.inner} pathLength="1" />
                                    )}
                                    {module.section && (
                                        <path class={s.moduleSection} d={module.section} pathLength="1" />
                                    )}
                                    <path class={s.moduleGrid} d={module.grid} pathLength="1" />
                                    <path class={s.moduleOutline} d={module.volume} pathLength="1" />
                                </g>
                            </g>
                        </g>
                    ))}
                </svg>
            </div>
        )
    },
})
