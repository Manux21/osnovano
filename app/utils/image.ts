const DEFAULT_WIDTHS = [480, 720, 960, 1280, 1600]

export function unsplashSrc(id: string, width: number, height?: number): string {
    if (id.startsWith('/')) {
        return id
    }

    const params = new URLSearchParams({
        auto: 'format',
        fit: 'crop',
        w: String(width),
        q: '65',
    })

    if (height) {
        params.set('h', String(height))
    }

    return `https://images.unsplash.com/${id}?${params.toString()}`
}

export function unsplashSrcSet(id: string, widths = DEFAULT_WIDTHS): string {
    if (id.startsWith('/')) {
        return id
    }

    return widths.map((width) => `${unsplashSrc(id, width)} ${width}w`).join(', ')
}
