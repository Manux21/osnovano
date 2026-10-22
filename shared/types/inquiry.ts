export type TInquiryTopic = 'architecture' | 'interior' | 'commercial' | 'other'

export type TInquiryPayload = {
    name: string
    email: string
    phone: string
    topic: TInquiryTopic
    message: string
}

export type TInquiryField = keyof TInquiryPayload

export type TInquiryErrors = Partial<Record<TInquiryField, string>>

export type TInquiryValidationResult =
    | { ok: true; data: TInquiryPayload }
    | { ok: false; errors: TInquiryErrors }
