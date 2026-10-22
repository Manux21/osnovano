import { defineComponent, type PropType } from 'vue'

import { AppImage } from '~/components/ui/app-image/app-image'
import type { TAppImageRatio } from '~/components/ui/app-image/types'
import { TextView } from '~/components/ui/text-view/text-view'
import { CATEGORY_LABELS } from '~/constants/categories'
import { ROUTES } from '~/constants/routes'
import type { TProject } from '~/types/project'

import s from './project-card.module.css'

export const ProjectCard = defineComponent({
    name: 'ProjectCard',

    props: {
        project: {
            type: Object as PropType<TProject>,
            required: true,
        },
        priority: {
            type: Boolean,
            default: false,
        },
        ratio: {
            type: String as PropType<TAppImageRatio>,
            default: '3/2',
        },
        sizes: {
            type: String,
            default: '(min-width: 1000px) 50vw, 100vw',
        },
    },

    setup(props) {
        return () => (
            <NuxtLink class={s.root} to={`${ROUTES.projects}/${props.project.slug}`}>
                <div class={s.media}>
                    <AppImage
                        src={props.project.cover}
                        alt={props.project.title}
                        priority={props.priority}
                        ratio={props.ratio}
                        sizes={props.sizes}
                    />
                </div>
                <div class={s.content}>
                    <div class={s.line}>
                        <TextView tag="h3" variant="subheading">
                            {props.project.title}
                        </TextView>
                        <span class={s.arrow} aria-hidden="true">→</span>
                    </div>
                    <div class={s.meta}>
                        <TextView tag="span" variant="label">
                            {CATEGORY_LABELS[props.project.category]}
                        </TextView>
                        <TextView tag="span" variant="label">
                            {props.project.location}{props.project.year ? ` — ${props.project.year}` : ''}
                        </TextView>
                    </div>
                </div>
            </NuxtLink>
        )
    },
})
