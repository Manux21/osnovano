import { defineComponent } from 'vue'

import { BlueprintField } from '~/components/graphics/blueprint-field/blueprint-field'
import { PageContainer } from '~/components/layout/page-container/page-container'
import { SectionWash } from '~/components/layout/section-wash/section-wash'
import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'
import { PRINCIPLES } from '~/data/principles'

import { MANIFESTO_WORDS } from './constants'
import s from './manifesto-section.module.css'

export const ManifestoSection = defineComponent({
    name: 'ManifestoSection',

    setup() {
        return () => (
            <section class={s.root} data-theme="dark">
                <SectionWash>
                    <BlueprintField />
                    <PageContainer class={s.panel}>
                        <div class={s.layout}>
                            <Reveal class={s.head} effect="fade">
                                <TextView tag="span" variant="label">Манифест</TextView>
                            </Reveal>
                            <Reveal class={s.quote} step={1}>
                                <TextView tag="blockquote" variant="quote">
                                    {MANIFESTO_WORDS.map((word, index) => (
                                        <span
                                            class={s.word}
                                            key={`${index}-${word}`}
                                            style={{ '--index': index }}
                                        >
                                            {`${word} `}
                                        </span>
                                    ))}
                                </TextView>
                            </Reveal>
                        </div>
                        <div class={s.grid}>
                            {PRINCIPLES.map((principle, index) => (
                                <Reveal tag="article" class={s.item} key={principle.id} step={index + 1}>

                                    <TextView tag="h3" variant="subheading">{principle.title}</TextView>
                                    <TextView variant="caption">{principle.text}</TextView>
                                </Reveal>
                            ))}
                        </div>
                    </PageContainer>
                </SectionWash>
            </section>
        )
    },
})
