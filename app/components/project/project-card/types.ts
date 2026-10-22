import type { TAppImageRatio } from '~/components/ui/app-image/types'
import type { TProject } from '~/types/project'

export type TProjectCardProps = {
    project: TProject
    priority?: boolean
    ratio?: TAppImageRatio
    sizes?: string
}
