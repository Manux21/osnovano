import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { TextView } from '~/components/ui/text-view/text-view'
import { SERVICES } from '~/data/services'

import { ServiceScene } from './service-scene'
import s from './services-section.module.css'

export const ServicesSection = defineComponent({
    name: 'ServicesSection',

    setup() {
        const { target, isArmed, isRevealed } = useReveal({
            animateInitial: true,
            rootMargin: '0px',
            threshold: 0.18,
        })

        return () => (
            <section class={s.root}>
                <PageContainer>
                    <SectionHeading
                        index="Направления"
                        title="Берём проект целиком"
                        description="От первой посадки до авторского надзора. Состав разделов собираем под задачу, а не под шаблон."
                    />
                    <div ref={target} class={s.list}>
                        {SERVICES.map((service, index) => (
                            <article class={s.item} key={service.id}>
                                <ServiceScene
                                    active={isRevealed.value}
                                    armed={isArmed.value}
                                    class={s.glyph}
                                    delay={index * 100}
                                    scene={service.id}
                                />
                                <div class={s.body}>
                                    <TextView tag="h3" variant="subheading">{service.title}</TextView>
                                    <TextView variant="caption">{service.description}</TextView>
                                </div>
                            </article>
                        ))}
                    </div>
                </PageContainer>
            </section>
        )
    },
})
