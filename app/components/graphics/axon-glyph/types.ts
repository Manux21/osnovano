export type TAxonSurface = {
    path: string
    tone: 'top' | 'front' | 'side' | 'detail'
}

export type TAxonGlyph = {
    site?: string
    ticks?: string
    dots?: string
    surfaces: TAxonSurface[]
}
