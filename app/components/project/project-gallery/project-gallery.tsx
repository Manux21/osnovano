import { defineComponent, type PropType } from 'vue'

import { AppImage } from '~/components/ui/app-image/app-image'
import { Reveal } from '~/components/ui/reveal/reveal'

import { GALLERY_LAYOUT } from './constants'
import s from './project-gallery.module.css'

export const ProjectGallery = defineComponent({
    name: 'ProjectGallery',

    props: {
        title: {
            type: String,
            required: true,
        },
        images: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },

    setup(props) {
        return () => (
            <div class={s.root}>
                {props.images.map((image, index) => {
                    const layout = GALLERY_LAYOUT[index % GALLERY_LAYOUT.length]

                    return (
                        <Reveal tag="figure" class={s.item} key={image} effect="fade">
                            <AppImage
                                src={image}
                                alt={`${props.title}, кадр ${index + 1}`}
                                ratio={layout?.ratio}
                                sizes={layout?.sizes}
                            />
                        </Reveal>
                    )
                })}
            </div>
        )
    },
})
