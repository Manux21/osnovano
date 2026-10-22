import type { TInquiryPayload, TInquiryTopic } from '../types/inquiry'
import type { TInquiryErrors, TInquiryValidationResult } from '../types/inquiry'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TOPICS: TInquiryTopic[] = ['architecture', 'interior', 'commercial', 'other']

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null
}

function readString(value: unknown): string {
    if (typeof value !== 'string') {
        return ''
    }

    return value.trim()
}

function isTopic(value: string): value is TInquiryTopic {
    return TOPICS.includes(value as TInquiryTopic)
}

export function validateInquiry(input: unknown): TInquiryValidationResult {
    const errors: TInquiryErrors = {}
    const source = isRecord(input) ? input : {}

    const name = readString(source.name)
    const email = readString(source.email)
    const phone = readString(source.phone)
    const topic = readString(source.topic)
    const message = readString(source.message)

    if (name.length < 2) {
        errors.name = 'Укажите имя'
    } else if (name.length > 120) {
        errors.name = 'Имя слишком длинное'
    }

    if (!EMAIL_PATTERN.test(email)) {
        errors.email = 'Укажите корректный email'
    }

    if (phone && (phone.length < 5 || phone.length > 32)) {
        errors.phone = 'Укажите корректный телефон'
    }

    if (!isTopic(topic)) {
        errors.topic = 'Выберите тип проекта'
    }

    if (message.length < 10) {
        errors.message = 'Опишите задачу подробнее'
    } else if (message.length > 2000) {
        errors.message = 'Сообщение слишком длинное'
    }

    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            errors,
        }
    }

    const data: TInquiryPayload = {
        name,
        email,
        phone,
        topic,
        message,
    }

    return {
        ok: true,
        data,
    }
}
