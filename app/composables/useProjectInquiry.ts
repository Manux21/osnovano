import { reactive, ref } from 'vue'

import type { TInquiryErrors, TInquiryPayload } from '#shared/types/inquiry'
import { validateInquiry } from '#shared/utils/validate-inquiry'

export function useProjectInquiry() {
    const form = reactive<TInquiryPayload>({
        name: '',
        email: '',
        phone: '',
        topic: 'architecture',
        message: '',
    })
    const errors = ref<TInquiryErrors>({})
    const formMessage = ref('')

    function submit() {
        const validation = validateInquiry(form)
        errors.value = validation.ok ? {} : validation.errors
        formMessage.value = validation.ok
            ? 'Это демонстрационная форма. Отправка заявок пока не подключена.'
            : ''
    }

    return { form, errors, formMessage, submit }
}
