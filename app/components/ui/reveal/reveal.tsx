import { defineComponent, type PropType } from 'vue'

import s from './reveal.module.css'
import type { TRevealEffect, TRevealTag } from './types'

export const Reveal = defineComponent({
    name: 'Reveal',

    props: {
        tag: {
            type: String as PropType<TRevealTag>,
            default: 'div',
        },
        effect: {
            type: String as PropType<TRevealEffect>,
            default: 'up',
        },
        step: {
            type: Number,
            default: 0,
        },
    },

    setup(props, { slots }) {
        const { target, isArmed, isRevealed } = useReveal()

        return () => {
            const Tag = props.tag

            return (
                <Tag
                    ref={target}
                    class={[
                        s.root,
                        isArmed.value && s[props.effect],
                        isRevealed.value && s.revealed,
                    ]}
                    data-step={props.step}
                >
                    {slots.default?.()}
                </Tag>
            )
        }
    },
})
