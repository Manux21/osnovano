import { reactive, ref } from 'vue'

import type { TInquiryErrors, TInquiryPayload } from '#shared/types/inquiry'
import { validateInquiry } from '#shared/utils/validate-inquiry'

type TInquiryStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY_FORM: TInquiryPayload = {
    name: '',
    email: '',
    phone: '',
    topic: 'architecture',
    message: '',
}

export function useProjectInquiry() {
    const form = reactive<TInquiryPayload>({ ...EMPTY_FORM })
    const errors = ref<TInquiryErrors>({})
    const status = ref<TInquiryStatus>('idle')
    const serverMessage = ref('')

    function reset() {
        form.name = EMPTY_FORM.name
        form.email = EMPTY_FORM.email
        form.phone = EMPTY_FORM.phone
        form.topic = EMPTY_FORM.topic
        form.message = EMPTY_FORM.message
        errors.value = {}
        status.value = 'idle'
        serverMessage.value = ''
    }

    async function submit() {
        const validation = validateInquiry(form)
        errors.value = validation.ok ? {} : validation.errors

        if (!validation.ok) {
            return
        }

        status.value = 'submitting'
        serverMessage.value = ''

        try {
            await $fetch('/api/inquiries', {
                method: 'POST',
                body: validation.data,
            })
            status.value = 'success'
            form.name = EMPTY_FORM.name
            form.email = EMPTY_FORM.email
            form.phone = EMPTY_FORM.phone
            form.topic = EMPTY_FORM.topic
            form.message = EMPTY_FORM.message
        } catch (error) {
            status.value = 'error'
            serverMessage.value = 'Не удалось отправить заявку. Попробуйте ещё раз или напишите на почту.'

            if (error && typeof error === 'object' && 'data' in error) {
                const data = error.data as { errors?: TInquiryErrors } | undefined

                if (data?.errors) {
                    errors.value = data.errors
                }
            }
        }
    }

    return {
        form,
        errors,
        status,
        serverMessage,
        submit,
        reset,
    }
}
