export type TLegalSection = {
    heading: string
    paragraphs: string[]
}

export type TLegalPage = {
    slug: string
    title: string
    description: string
    updatedAt: string
    sections: TLegalSection[]
}
