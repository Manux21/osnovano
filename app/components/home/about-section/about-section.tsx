import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { AppImage } from '~/components/ui/app-image/app-image'
import { Button } from '~/components/ui/button/button'
import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'
import { ROUTES } from '~/constants/routes'
import { COMPANY } from '~/data/company'

import s from './about-section.module.css'

export const AboutSection = defineComponent({
    name: 'AboutSection',

    setup() {
        return () => (
            <section class={s.root}>
                <PageContainer>
                    <Reveal tag="header" class={s.header} effect="fade">
                        <div class={s.eyebrow}>
                            <TextView tag="span" variant="label">Бюро</TextView>
                            <TextView tag="span" variant="label">
                                {COMPANY.city} · с {COMPANY.founded} года
                            </TextView>
                        </div>
                        <TextView tag="h2" variant="heading" class={s.title}>
                            Небольшое бюро, которое доводит проект до стройки
                        </TextView>
                    </Reveal>
                    <Reveal tag="figure" class={s.media} effect="fade">
                        <AppImage
                            src="/images/projects/barvikha/cover.jpg"
                            alt="Бассейн резиденции в Барвихе: светлый камень, вода и естественный свет"
                            ratio="21/9"
                            sizes="100vw"
                            widths={[640, 960, 1280, 1600, 2000]}
                        />
                        <figcaption class={s.caption}>
                            <TextView tag="span" variant="label">Резиденция в Барвихе</TextView>
                            <TextView tag="span" variant="label">Свет · материал · пространство</TextView>
                        </figcaption>
                    </Reveal>
                    <Reveal class={s.copy} effect="fade">
                        <TextView variant="lead">
                            Мы проектируем так, чтобы здание можно было объяснить конструктору, подрядчику и человеку, который будет в нём жить.
                        </TextView>
                        <div class={s.details}>
                            <TextView variant="body">
                                Ведём немного проектов одновременно, чтобы отвечать за каждое решение. В работе важны ясная посадка, честный материал и свет, который не нужно имитировать вечером. Бюро сознательно остаётся небольшим: так проще держать качество на площадке.
                            </TextView>
                            <Button to={ROUTES.contact} variant="inline" arrow>
                                Обсудить проект
                            </Button>
                        </div>
                    </Reveal>
                </PageContainer>
            </section>
        )
    },
})
