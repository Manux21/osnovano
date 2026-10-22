import { defineComponent, ref } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { TextView } from '~/components/ui/text-view/text-view'
import { FAQ } from '~/data/faq'

import s from './faq-section.module.css'

export const FaqSection = defineComponent({
    name: 'FaqSection',

    setup() {
        const openId = ref<string | null>(FAQ[0]?.id ?? null)

        function handleToggle(event: MouseEvent) {
            const target = event.currentTarget as HTMLButtonElement
            const id = target.dataset.id

            if (!id) {
                return
            }

            if (openId.value === id) {
                openId.value = null

                return
            }

            openId.value = id
        }

        return () => (
            <section class={s.root}>
                <PageContainer>
                    <SectionHeading
                        index="Вопросы"
                        title="Коротко о старте, сроках и надзоре"
                        description="Если вопроса нет в списке — напишите, ответим отдельно и без шаблонов."
                    />
                    <div class={s.list}>
                        {FAQ.map((item) => {
                            const isOpen = openId.value === item.id

                            return (
                                <article class={[s.item, isOpen && s.open]} key={item.id}>
                                    <button
                                        class={s.trigger}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-${item.id}`}
                                        data-id={item.id}
                                        onClick={handleToggle}
                                    >
                                        <TextView tag="h3" variant="subheading">{item.question}</TextView>
                                        <span class={s.icon} aria-hidden="true" />
                                    </button>
                                    <div class={s.answer} id={`faq-${item.id}`}>
                                        <div class={s.answerInner}>
                                            <TextView variant="body">{item.answer}</TextView>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </PageContainer>
            </section>
        )
    },
})
