import type { TAppImageRatio } from '~/components/ui/app-image/types'

type TCardLayout = {
    ratio: TAppImageRatio
    sizes: string
}

export const FEATURED_LAYOUT: TCardLayout[] = [
    { ratio: '4/3', sizes: '(min-width: 800px) 50vw, 100vw' },
    { ratio: '4/3', sizes: '(min-width: 800px) 50vw, 100vw' },
    { ratio: '16/10', sizes: '100vw' },
]

export const ARCHIVE_LAYOUT: TCardLayout[] = [
    { ratio: '3/2', sizes: '(min-width: 800px) 50vw, 100vw' },
]
