import { defineComponent } from 'vue'

import { AXON_DOTS, AXON_SITE, AXON_TICKS, AXON_VIEW_BOX } from '~/constants/axon-drawing'

import { SERVICE_SCENES } from './constants'
import s from './service-scene.module.css'

export const ServiceScene = defineComponent({
    name: 'ServiceScene',
    props: {
        scene: { type: String, required: true },
        active: { type: Boolean, default: false },
        armed: { type: Boolean, default: false },
        delay: { type: Number, default: 0 },
    },
    setup(props) {
        return () => (
            <div
                class={[
                    s.root,
                    props.armed && !props.active && s.waiting,
                    props.armed && props.active && s.assembled,
                ]}
                style={{ '--scene-delay': `${props.delay}ms` }}
                aria-hidden="true"
            >
                <svg class={s.canvas} viewBox={AXON_VIEW_BOX} fill="none">
                    <g class={s.guides}>
                        <path class={s.site} d={AXON_SITE} />
                        <path class={s.dots} d={AXON_DOTS} />
                        <path class={s.ticks} d={AXON_TICKS} />
                        <path class={s.axis} d="M0 -74V-51" />
                        <path class={s.ticks} d="M-3 -61H3M0 -64V-58" />
                    </g>
                    {SERVICE_SCENES[props.scene]?.map((part, index) => (
                        <g
                            class={s.part}
                            key={part.id}
                            style={{
                                '--part-x': `${part.offset[0]}px`,
                                '--part-y': `${part.offset[1]}px`,
                                '--part-delay': `${index * 110}ms`,
                            }}
                        >
                            <g class={s.assembly}>
                                {part.layers.map((layer, layerIndex) => (
                                    <path class={[s.surface, s[layer.tone]]} d={layer.path} key={layerIndex} />
                                ))}
                            </g>
                        </g>
                    ))}
                </svg>
            </div>
        )
    },
})
