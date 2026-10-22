import { defineComponent, type PropType } from 'vue'

import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'

import s from './section-heading.module.css'

export const SectionHeading = defineComponent({
    name: 'SectionHeading',

    props: {
        index: {
            type: String,
            default: undefined,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: undefined,
        },
        tag: {
            type: String as PropType<'h1' | 'h2'>,
            default: 'h2',
        },
    },

    setup(props) {
        return () => (
            <Reveal class={s.root} tag="header">
                <div class={s.main}>
                    {props.index && (
                        <TextView tag="span" variant="label">
                            {props.index}
                        </TextView>
                    )}
                    <TextView tag={props.tag} variant="heading">
                        {props.title}
                    </TextView>
                </div>
                {props.description && (
                    <div class={s.copy}>
                        <TextView variant="lead">{props.description}</TextView>
                    </div>
                )}
            </Reveal>
        )
    },
})
