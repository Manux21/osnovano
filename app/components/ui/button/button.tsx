import { defineComponent, type PropType } from 'vue'

import { TextView } from '~/components/ui/text-view/text-view'

import s from './button.module.css'
import type { TButtonVariant } from './types'

export const Button = defineComponent({
    name: 'Button',

    props: {
        variant: {
            type: String as PropType<TButtonVariant>,
            default: 'primary',
        },
        to: {
            type: String,
            default: undefined,
        },
        href: {
            type: String,
            default: undefined,
        },
        type: {
            type: String as PropType<'button' | 'submit'>,
            default: 'button',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        arrow: {
            type: Boolean,
            default: false,
        },
    },

    emits: {
        click: (_event: MouseEvent) => true,
    },

    setup(props, { slots, emit }) {
        function handleClick(event: MouseEvent) {
            emit('click', event)
        }

        return () => {
            const content = (
                <>
                    <TextView tag="span" variant="label">
                        {slots.default?.()}
                    </TextView>
                    {props.arrow && <span class={s.arrow} aria-hidden="true">→</span>}
                </>
            )

            const className = [s.root, s[props.variant]]

            if (props.to) {
                return (
                    <NuxtLink class={className} to={props.to}>
                        {content}
                    </NuxtLink>
                )
            }

            if (props.href) {
                return (
                    <a class={className} href={props.href}>
                        {content}
                    </a>
                )
            }

            return (
                <button
                    class={className}
                    type={props.type}
                    disabled={props.disabled}
                    onClick={handleClick}
                >
                    {content}
                </button>
            )
        }
    },
})
