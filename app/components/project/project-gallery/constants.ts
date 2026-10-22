import type { TAppImageRatio } from '~/components/ui/app-image/types'

type TGalleryLayout = {
    ratio: TAppImageRatio
    sizes: string
}

export const GALLERY_LAYOUT: TGalleryLayout[] = [
    { ratio: '16/10', sizes: '100vw' },
    { ratio: '3/2', sizes: '(min-width: 1000px) 58vw, 100vw' },
    { ratio: '4/5', sizes: '(min-width: 1000px) 32vw, 100vw' },
]
