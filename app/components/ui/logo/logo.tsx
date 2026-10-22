import { defineComponent, type PropType } from 'vue'

import { SITE_NAME } from '~/constants/site'

import { WORDMARK_GLYPHS, WORDMARK_VIEW_BOX } from './constants'
import s from './logo.module.css'
import type { TLogoSize } from './types'

export const Logo = defineComponent({
    name: 'Logo',

    props: {
        size: {
            type: String as PropType<TLogoSize>,
            default: 'sm',
        },
        animate: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        return () => (
            <span
                class={[s.root, s[props.size], props.animate && s.animated]}
                role="img"
                aria-label={SITE_NAME}
            >
                <svg class={s.canvas} viewBox={WORDMARK_VIEW_BOX} fill="none">
                    {WORDMARK_GLYPHS.map((glyph, index) => (
                        <path
                            class={s.glyph}
                            d={glyph}
                            fill-rule="evenodd"
                            key={index}
                            style={{ '--glyph-index': index }}
                        />
                    ))}
                </svg>
                {props.animate && <span class={s.guide} aria-hidden="true" />}
            </span>
        )
    },
})
