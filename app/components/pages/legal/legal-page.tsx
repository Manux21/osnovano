import { defineComponent, type PropType } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'
import type { TLegalPage } from '~/types/legal'

import s from './legal-page.module.css'

export const LegalPage = defineComponent({
    name: 'LegalPage',

    props: {
        page: {
            type: Object as PropType<TLegalPage>,
            required: true,
        },
    },

    setup(props) {
        usePageSeo({
            title: props.page.title,
            description: props.page.description,
            path: `/${props.page.slug}`,
        })

        return () => (
            <main class={s.root}>
                <PageContainer>
                    <Reveal tag="header" class={s.header}>
                        <TextView tag="span" variant="label">
                            Обновлено {props.page.updatedAt}
                        </TextView>
                        <TextView tag="h1" variant="title">{props.page.title}</TextView>
                        <TextView variant="lead">{props.page.description}</TextView>
                    </Reveal>
                    <div class={s.content}>
                        {props.page.sections.map((section) => (
                            <section class={s.section} key={section.heading}>
                                <TextView tag="h2" variant="subheading">{section.heading}</TextView>
                                <div class={s.paragraphs}>
                                    {section.paragraphs.map((paragraph) => (
                                        <TextView key={paragraph} variant="body">{paragraph}</TextView>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </PageContainer>
            </main>
        )
    },
})
