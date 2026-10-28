import { computed, defineComponent, type PropType } from 'vue'

import { unsplashSrc, unsplashSrcSet } from '~/utils/image'

import s from './app-image.module.css'
import { PREVIEW_WIDTH } from './constants'
import type { TAppImageRatio } from './types'

export const AppImage = defineComponent({
    name: 'AppImage',

    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
        sizes: {
            type: String,
            default: '(min-width: 1100px) 50vw, 100vw',
        },
        widths: {
            type: Array as PropType<number[]>,
            default: undefined,
        },
        priority: {
            type: Boolean,
            default: false,
        },
        pan: {
            type: Boolean,
            default: false,
        },
        ratio: {
            type: String as PropType<TAppImageRatio>,
            default: undefined,
        },
    },

    setup(props) {
        const assetPath = useAssetPath()
        const src = computed(() => assetPath(unsplashSrc(props.src, 1280)))
        const srcset = computed(() => assetPath(unsplashSrcSet(props.src, props.widths)))
        const preview = computed(() => `url(${assetPath(unsplashSrc(props.src, PREVIEW_WIDTH))})`)

        return () => (
            <div
                class={s.root}
                data-ratio={props.ratio}
                data-pan={props.pan || undefined}
                style={{ '--preview': preview.value }}
            >
                <img
                    class={s.media}
                    src={src.value}
                    srcset={srcset.value}
                    sizes={props.sizes}
                    alt={props.alt}
                    loading={props.priority ? 'eager' : 'lazy'}
                    decoding={props.priority ? 'sync' : 'async'}
                    fetchpriority={props.priority ? 'high' : 'auto'}
                />
            </div>
        )
    },
})
