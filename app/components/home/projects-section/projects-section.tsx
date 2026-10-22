import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { ProjectGrid } from '~/components/project/project-grid/project-grid'
import { Button } from '~/components/ui/button/button'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { ROUTES } from '~/constants/routes'

import s from './projects-section.module.css'

export const ProjectsSection = defineComponent({
    name: 'ProjectsSection',

    setup() {
        const { getFeatured } = useProjects()
        const projects = getFeatured()

        return () => (
            <section class={s.root}>
                <PageContainer>
                    <SectionHeading
                        index="Недавние проекты"
                        title="Дома, интерьеры и коммерческие пространства"
                        description="Три проекта, по которым видно метод бюро. Остальные — в архиве."
                    />
                    <ProjectGrid projects={projects} featured />
                    <div class={s.action}>
                        <Button to={ROUTES.projects} variant="inline" arrow>
                            Все проекты
                        </Button>
                    </div>
                </PageContainer>
            </section>
        )
    },
})
