import { defineComponent, type PropType } from 'vue'

import s from './page-container.module.css'

export const PageContainer = defineComponent({
    name: 'PageContainer',

    props: {
        as: {
            type: String as PropType<'div' | 'section' | 'header' | 'footer' | 'main'>,
            default: 'div',
        },
    },

    setup(props, { slots }) {
        return () => {
            const Tag = props.as

            return <Tag class={s.root}>{slots.default?.()}</Tag>
        }
    },
})
