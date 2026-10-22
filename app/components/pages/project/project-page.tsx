import { computed, defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { ProjectGallery } from '~/components/project/project-gallery/project-gallery'
import { ProjectMeta } from '~/components/project/project-meta/project-meta'
import { AppImage } from '~/components/ui/app-image/app-image'
import { Button } from '~/components/ui/button/button'
import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'
import { CATEGORY_LABELS } from '~/constants/categories'
import { ROUTES } from '~/constants/routes'
import { splitParagraphs } from '~/utils/format'
import { unsplashSrc } from '~/utils/image'

import s from './project-page.module.css'

export const ProjectPage = defineComponent({
    name: 'ProjectPage',

    setup() {
        const route = useRoute()
        const { getBySlug, getNext } = useProjects()

        const project = computed(() => getBySlug(String(route.params.slug)))

        if (!project.value) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Проект не найден',
            })
        }

        const paragraphs = computed(() => splitParagraphs(project.value?.description ?? ''))
        const nextProject = computed(() => {
            if (!project.value) {
                return undefined
            }

            return getNext(project.value.slug)
        })

        usePageSeo({
            title: project.value.title,
            description: project.value.excerpt,
            path: `${ROUTES.projects}/${project.value.slug}`,
            image: unsplashSrc(project.value.cover, 1200),
        })

        return () => {
            const current = project.value

            if (!current) {
                return null
            }

            const next = nextProject.value

            return (
                <main class={s.root}>
                    <PageContainer>
                        <Reveal tag="header" class={s.header} effect="fade">
                            <div class={s.headTop}>
                                <TextView tag="span" variant="label">
                                    {current.id} — {CATEGORY_LABELS[current.category]}
                                </TextView>
                                <Button to={ROUTES.projects} variant="inline">
                                    Все проекты
                                </Button>
                            </div>
                            <TextView tag="h1" variant="title">{current.title}</TextView>
                            <TextView variant="lead">{current.excerpt}</TextView>
                        </Reveal>
                    </PageContainer>
                    <Reveal class={s.cover} effect="fade">
                        <AppImage
                            src={current.cover}
                            alt={current.title}
                            priority
                            ratio="21/9"
                            sizes="100vw"
                            widths={[960, 1280, 1600]}
                        />
                    </Reveal>
                    <PageContainer>
                        <ProjectMeta project={current} />
                        <Reveal class={s.body} effect="fade">
                            {paragraphs.value.map((paragraph) => (
                                <TextView
                                    key={paragraph}
                                    variant="body"
                                >
                                    {paragraph}
                                </TextView>
                            ))}
                        </Reveal>
                        <div class={s.gallery}>
                            <ProjectGallery title={current.title} images={current.gallery} />
                        </div>
                        {next && (
                            <Reveal class={s.next} effect="fade">
                                <NuxtLink class={s.nextLink} to={`${ROUTES.projects}/${next.slug}`}>
                                    <TextView tag="span" variant="label">Следующий проект</TextView>
                                    <div class={s.nextRow}>
                                        <TextView tag="p" variant="title">{next.title}</TextView>
                                        <span class={s.nextArrow} aria-hidden="true">→</span>
                                    </div>
                                </NuxtLink>
                            </Reveal>
                        )}
                    </PageContainer>
                </main>
            )
        }
    },
})
