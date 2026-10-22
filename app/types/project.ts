export type TProjectCategory = 'architecture' | 'interior' | 'commercial'

export type TProject = {
    id: string
    slug: string
    order: number
    title: string
    category: TProjectCategory
    location: string
    year?: number
    area?: number
    excerpt: string
    description: string
    cover: string
    gallery: string[]
    featured?: boolean
}
