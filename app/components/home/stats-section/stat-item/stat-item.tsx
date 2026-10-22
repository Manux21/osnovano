import { defineComponent } from 'vue'

import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'

import s from './stat-item.module.css'

export const StatItem = defineComponent({
    name: 'StatItem',

    props: {
        value: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        step: {
            type: Number,
            default: 0,
        },
    },

    setup(props) {
        const { target, display } = useCountUp(props.value)

        return () => (
            <Reveal tag="article" class={s.root} step={props.step}>
                <TextView tag="p" variant="number">
                    <span ref={target}>{display.value}</span>
                </TextView>
                <TextView tag="span" variant="label">{props.label}</TextView>
            </Reveal>
        )
    },
})
