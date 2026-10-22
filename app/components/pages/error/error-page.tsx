import { computed, defineComponent, type PropType } from 'vue'
import type { NuxtError } from '#app'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { Button } from '~/components/ui/button/button'
import { TextView } from '~/components/ui/text-view/text-view'
import { ROUTES } from '~/constants/routes'

import s from './error-page.module.css'

export const ErrorPage = defineComponent({
    name: 'ErrorPage',

    props: {
        error: {
            type: Object as PropType<NuxtError | null>,
            default: null,
        },
    },

    setup(props) {
        const code = computed(() => props.error?.statusCode ?? 500)
        const isNotFound = computed(() => code.value === 404)

        function handleClear() {
            clearError({ redirect: ROUTES.home })
        }

        return () => (
            <main class={s.root}>
                <PageContainer>
                    <div class={s.inner}>
                        <TextView tag="p" variant="display">{code.value}</TextView>
                        <div class={s.copy}>
                            <TextView tag="h1" variant="heading">
                                {isNotFound.value ? 'Страница не найдена' : 'Что-то сломалось'}
                            </TextView>
                            <TextView variant="lead">
                                {isNotFound.value
                                    ? 'Такого адреса нет. Можно вернуться на главную или открыть архив проектов.'
                                    : 'Попробуйте обновить страницу. Если ошибка останется, напишите нам.'}
                            </TextView>
                            <div class={s.actions}>
                                <Button arrow onClick={handleClear}>
                                    На главную
                                </Button>
                                <Button to={ROUTES.projects} variant="inline" arrow>
                                    Проекты
                                </Button>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </main>
        )
    },
})
