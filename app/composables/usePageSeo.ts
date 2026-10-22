import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME } from '~/constants/site'
import type { TPageSeo } from '~/types/seo'

export function usePageSeo(meta: TPageSeo) {
    const config = useRuntimeConfig()
    const canonical = `${config.public.siteUrl}${meta.path}`
    const imagePath = meta.image ?? DEFAULT_OG_IMAGE
    const image = imagePath.startsWith('/') ? `${config.public.siteUrl}${imagePath}` : imagePath
    const title = meta.title
    const description = meta.description || SITE_DESCRIPTION

    useSeoMeta({
        title,
        description,
        ogTitle: `${title} — ${SITE_NAME}`,
        ogDescription: description,
        ogImage: image,
        ogUrl: canonical,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: `${title} — ${SITE_NAME}`,
        twitterDescription: description,
        twitterImage: image,
    })

    useHead({
        link: [
            {
                rel: 'canonical',
                href: canonical,
            },
        ],
    })
}
