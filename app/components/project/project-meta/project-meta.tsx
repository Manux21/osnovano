import { defineComponent, type PropType } from 'vue'

import { TextView } from '~/components/ui/text-view/text-view'
import { CATEGORY_LABELS } from '~/constants/categories'
import type { TProject } from '~/types/project'
import { formatArea } from '~/utils/format'

import s from './project-meta.module.css'

export const ProjectMeta = defineComponent({
    name: 'ProjectMeta',

    props: {
        project: {
            type: Object as PropType<TProject>,
            required: true,
        },
    },

    setup(props) {
        return () => (
            <dl class={s.root}>
                <div class={s.item}>
                    <TextView tag="dt" variant="label">Тип</TextView>
                    <TextView tag="dd" variant="subheading">{CATEGORY_LABELS[props.project.category]}</TextView>
                </div>
                <div class={s.item}>
                    <TextView tag="dt" variant="label">Место</TextView>
                    <TextView tag="dd" variant="subheading">{props.project.location}</TextView>
                </div>
                {props.project.year && (
                    <div class={s.item}>
                        <TextView tag="dt" variant="label">Год</TextView>
                        <TextView tag="dd" variant="subheading">{props.project.year}</TextView>
                    </div>
                )}
                {props.project.area && (
                    <div class={s.item}>
                        <TextView tag="dt" variant="label">Площадь</TextView>
                        <TextView tag="dd" variant="subheading">{formatArea(props.project.area)}</TextView>
                    </div>
                )}
            </dl>
        )
    },
})
