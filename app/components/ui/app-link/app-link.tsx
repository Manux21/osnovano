import { defineComponent } from 'vue'

import s from './app-link.module.css'

export const AppLink = defineComponent({
    name: 'AppLink',

    props: {
        to: {
            type: String,
            required: true,
        },
        external: {
            type: Boolean,
            default: false,
        },
    },

    setup(props, { slots }) {
        return () => {
            if (props.external) {
                return (
                    <a class={s.root} href={props.to}>
                        {slots.default?.()}
                    </a>
                )
            }

            return (
                <NuxtLink class={s.root} to={props.to}>
                    {slots.default?.()}
                </NuxtLink>
            )
        }
    },
})
