import type { TService } from '~/types/service'

export const SERVICES: TService[] = [
    {
        id: 'architecture',
        title: 'Архитектура',
        description:
            'Частные дома, резиденции и новые здания. От посадки на участок до рабочей документации и авторского надзора.',
    },
    {
        id: 'interior',
        title: 'Интерьеры',
        description:
            'Квартиры и частные пространства, где планировка, свет и материал важнее декора. Полный цикл до сдачи объекта.',
    },
    {
        id: 'commercial',
        title: 'Общественные интерьеры',
        description:
            'Офисы, шоурумы, рестораны и общественные пространства',
    },
]
