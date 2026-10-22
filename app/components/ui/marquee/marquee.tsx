import { defineComponent, type PropType } from 'vue'

import { TextView } from '~/components/ui/text-view/text-view'

import s from './marquee.module.css'

export const Marquee = defineComponent({
    name: 'Marquee',

    props: {
        items: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const line = (key: string) => (
                <div class={s.line} key={key}>
                    {props.items.map((item) => (
                        <TextView tag="span" variant="label" key={item}>
                            {item}
                        </TextView>
                    ))}
                </div>
            )

            return (
                <div class={s.root} aria-hidden="true">
                    <div class={s.track}>
                        {line('a')}
                        {line('b')}
                    </div>
                </div>
            )
        }
    },
})
