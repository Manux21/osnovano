import { defineComponent, type PropType } from 'vue'

import s from './text-view.module.css'
import type { TTextTag, TTextVariant } from './types'

export const TextView = defineComponent({
    name: 'TextView',

    props: {
        tag: {
            type: String as PropType<TTextTag>,
            default: 'p',
        },
        variant: {
            type: String as PropType<TTextVariant>,
            required: true,
        },
    },

    setup(props, { slots }) {
        return () => {
            const Tag = props.tag

            return (
                <Tag class={[s.root, s[props.variant]]}>
                    {slots.default?.()}
                </Tag>
            )
        }
    },
})
