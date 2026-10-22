import { computed, defineComponent } from 'vue'

import s from './blueprint-field.module.css'
import {
    FIELD_DOTS,
    FIELD_GRID,
    FIELD_OUTLINE,
    FIELD_VIEW_BOX,
    FIELD_VOLUMES,
} from './constants'

export const BlueprintField = defineComponent({
    name: 'BlueprintField',

    setup() {
        const { offsetX, offsetY } = usePointerParallax()
        const { target, isArmed, isRevealed } = useReveal({
            animateInitial: true,
            observeClosest: 'section',
            rootMargin: '0px 0px -18% 0px',
        })

        const fieldStyle = computed(() => ({
            '--pointer-x': offsetX.value.toFixed(3),
            '--pointer-y': offsetY.value.toFixed(3),
        }))

        return () => (
            <div
                ref={target}
                class={[
                    s.root,
                    isArmed.value && s.armed,
                    isRevealed.value && s.revealed,
                ]}
                style={fieldStyle.value}
                aria-hidden="true"
            >
                <svg
                    class={s.canvas}
                    viewBox={FIELD_VIEW_BOX}
                    preserveAspectRatio="xMidYMax slice"
                    fill="none"
                >
                    <g class={s.plane}>
                        {FIELD_GRID.map((path, index) => (
                            <path
                                class={s.grid}
                                d={path}
                                key={path}
                                pathLength="1"
                                style={{ '--grid-index': index }}
                            />
                        ))}
                        <path class={s.dots} d={FIELD_DOTS} pathLength="1" />
                        <path class={s.outline} d={FIELD_OUTLINE} pathLength="1" />
                    </g>
                    <g class={s.volumes}>
                        <g class={s.sway}>
                            {FIELD_VOLUMES.map((path, index) => (
                                <path
                                    class={s.volumeLines}
                                    d={path}
                                    key={path}
                                    pathLength="1"
                                    style={{ '--volume-index': index }}
                                />
                            ))}
                        </g>
                    </g>
                </svg>
            </div>
        )
    },
})
