import { defineComponent } from 'vue'

import { AxonGlyph } from '~/components/graphics/axon-glyph/axon-glyph'
import { PageContainer } from '~/components/layout/page-container/page-container'
import { SectionWash } from '~/components/layout/section-wash/section-wash'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { TextView } from '~/components/ui/text-view/text-view'
import { PROCESS_STEPS } from '~/data/process'

import { PROCESS_GLYPHS } from './constants'
import s from './process-section.module.css'

export const ProcessSection = defineComponent({
    name: 'ProcessSection',

    setup() {
        const { target, isRevealed } = useReveal({
            animateInitial: true,
            rootMargin: '0px',
            threshold: 0.15,
        })

        return () => (
            <section class={s.root} data-theme="dark">
                <SectionWash>
                    <PageContainer>
                        <SectionHeading
                            index="Процесс"
                            title="Один маршрут для дома, интерьера и коммерции"
                            description="Меняется масштаб, а не метод. На каждом шаге понятно, что уже решено и что решается дальше."
                        />
                        <div
                            ref={target}
                            class={[s.list, isRevealed.value && s.revealed]}
                            data-process-timeline
                        >
                            <div class={s.track} aria-hidden="true">
                                <span class={s.beam} data-process-beam />
                                {PROCESS_STEPS.map((step, index) => (
                                    <span
                                        class={s.node}
                                        key={step.index}
                                        style={{ '--index': index }}
                                    />
                                ))}
                            </div>
                            {PROCESS_STEPS.map((step, index) => (
                                <article class={s.item} key={step.index}>
                                    <AxonGlyph
                                        active={isRevealed.value}
                                        class={s.glyph}
                                        glyph={PROCESS_GLYPHS[index]}
                                    />

                                    <TextView tag="h3" variant="subheading">{step.title}</TextView>
                                    <TextView variant="caption">{step.text}</TextView>
                                </article>
                            ))}
                        </div>
                    </PageContainer>
                </SectionWash>
            </section>
        )
    },
})
