import type { TInquiryTopic } from '#shared/types/inquiry'
import type { TProjectCategory } from '~/types/project'

export const CATEGORY_LABELS: Record<TProjectCategory, string> = {
    architecture: 'Архитектура',
    interior: 'Интерьер',
    commercial: 'Коммерция',
}

export const INQUIRY_TOPIC_LABELS: Record<TInquiryTopic, string> = {
    architecture: 'Архитектура',
    interior: 'Интерьер',
    commercial: 'Коммерция',
    other: 'Другое',
}

export const PROJECT_CATEGORIES: TProjectCategory[] = [
    'architecture',
    'interior',
    'commercial',
]
