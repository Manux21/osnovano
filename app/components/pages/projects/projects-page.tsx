import { computed, defineComponent, ref } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { ProjectGrid } from '~/components/project/project-grid/project-grid'
import { Reveal } from '~/components/ui/reveal/reveal'
import { TextView } from '~/components/ui/text-view/text-view'
import { CATEGORY_LABELS, PROJECT_CATEGORIES } from '~/constants/categories'
import { ROUTES } from '~/constants/routes'
import type { TProjectCategory } from '~/types/project'

import s from './projects-page.module.css'

export const ProjectsPage = defineComponent({
    name: 'ProjectsPage',

    setup() {
        const { projects: allProjects, getByCategory } = useProjects()
        const selected = ref<TProjectCategory | 'all'>('all')

        const projects = computed(() => {
            if (selected.value === 'all') {
                return getByCategory()
            }

            return getByCategory(selected.value)
        })

        function handleSelectAll() {
            selected.value = 'all'
        }

        const categoryHandlers = Object.fromEntries(
            PROJECT_CATEGORIES.map((category) => [
                category,
                () => {
                    selected.value = category
                },
            ]),
        ) as Record<TProjectCategory, () => void>

        usePageSeo({
            title: 'Проекты',
            description: 'Архитектура, интерьеры и коммерческие пространства бюро Основано.',
            path: ROUTES.projects,
        })

        return () => (
            <main class={s.root}>
                <PageContainer>
                    <Reveal class={s.header} tag="header">
                        <TextView tag="span" variant="label">
                            Архив — {allProjects.length} проектов
                        </TextView>
                        <TextView tag="h1" variant="title">Проекты</TextView>
                        <TextView variant="lead">
                            Реализованные интерьеры, архитектура и коммерческие пространства. Фильтр только сужает выборку.
                        </TextView>
                    </Reveal>
                    <div class={s.filters} role="group" aria-label="Фильтр по категориям">
                        <button
                            class={[s.filter, selected.value === 'all' && s.active]}
                            type="button"
                            aria-pressed={selected.value === 'all'}
                            onClick={handleSelectAll}
                        >
                            <TextView tag="span" variant="label">Все</TextView>
                        </button>
                        {PROJECT_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                class={[s.filter, selected.value === category && s.active]}
                                type="button"
                                aria-pressed={selected.value === category}
                                onClick={categoryHandlers[category]}
                            >
                                <TextView tag="span" variant="label">
                                    {CATEGORY_LABELS[category]}
                                </TextView>
                            </button>
                        ))}
                    </div>
                    <ProjectGrid projects={projects.value} />
                </PageContainer>
            </main>
        )
    },
})
