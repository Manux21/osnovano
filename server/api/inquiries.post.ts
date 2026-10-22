import { validateInquiry } from '#shared/utils/validate-inquiry'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const result = validateInquiry(body)

    if (!result.ok) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Проверьте поля формы',
            data: {
                errors: result.errors,
            },
        })
    }

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const storage = useStorage('inquiries')

    await storage.setItem(id, {
        id,
        createdAt: new Date().toISOString(),
        ...result.data,
    })

    return {
        ok: true,
        id,
    }
})
