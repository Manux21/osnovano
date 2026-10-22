import { PROJECTS } from '~/data/projects'
import type { TProject, TProjectCategory } from '~/types/project'

export function useProjects() {
    const projects = [...PROJECTS].sort((a, b) => a.order - b.order)

    function getBySlug(slug: string): TProject | undefined {
        return projects.find((project) => project.slug === slug)
    }

    function getFeatured(): TProject[] {
        return projects.filter((project) => project.featured)
    }

    function getByCategory(category?: TProjectCategory): TProject[] {
        if (!category) {
            return projects
        }

        return projects.filter((project) => project.category === category)
    }

    function getNext(slug: string): TProject | undefined {
        const index = projects.findIndex((project) => project.slug === slug)

        if (index === -1) {
            return undefined
        }

        return projects[(index + 1) % projects.length]
    }

    return {
        projects,
        getBySlug,
        getFeatured,
        getByCategory,
        getNext,
    }
}
