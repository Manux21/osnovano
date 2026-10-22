import { ROUTES } from '~/constants/routes'
import type { TNavItem } from '~/types/navigation'

export const MAIN_NAVIGATION: TNavItem[] = [
    { label: 'Бюро', to: ROUTES.home },
    { label: 'Проекты', to: ROUTES.projects },
    { label: 'Контакт', to: ROUTES.contact },
]

export const FOOTER_NAVIGATION: TNavItem[] = [
    { label: 'Бюро', to: ROUTES.home },
    { label: 'Проекты', to: ROUTES.projects },
    { label: 'Обсудить проект', to: ROUTES.contact },
]

export const LEGAL_NAVIGATION: TNavItem[] = [
    { label: 'Конфиденциальность', to: ROUTES.privacy },
    { label: 'Персональные данные', to: ROUTES.personalData },
    { label: 'Cookies', to: ROUTES.cookies },
]
