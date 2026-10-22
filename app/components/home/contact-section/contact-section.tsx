import { defineComponent } from 'vue'

import type { TInquiryTopic } from '#shared/types/inquiry'
import { PageContainer } from '~/components/layout/page-container/page-container'
import { AppLink } from '~/components/ui/app-link/app-link'
import { Button } from '~/components/ui/button/button'
import { FormField } from '~/components/ui/form-field/form-field'
import { Reveal } from '~/components/ui/reveal/reveal'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { TextView } from '~/components/ui/text-view/text-view'
import { INQUIRY_TOPIC_LABELS } from '~/constants/categories'
import { ROUTES } from '~/constants/routes'
import { COMPANY } from '~/data/company'

import s from './contact-section.module.css'

const TOPICS = Object.entries(INQUIRY_TOPIC_LABELS) as Array<[TInquiryTopic, string]>

export const ContactSection = defineComponent({
    name: 'ContactSection',

    setup() {
        const { form, errors, status, serverMessage, submit } = useProjectInquiry()

        function handleSubmit(event: Event) {
            event.preventDefault()
            void submit()
        }

        function handleNameInput(event: Event) {
            const target = event.target as HTMLInputElement
            form.name = target.value
        }

        function handleEmailInput(event: Event) {
            const target = event.target as HTMLInputElement
            form.email = target.value
        }

        function handlePhoneInput(event: Event) {
            const target = event.target as HTMLInputElement
            form.phone = target.value
        }

        function handleTopicChange(event: Event) {
            const target = event.target as HTMLSelectElement
            form.topic = target.value as TInquiryTopic
        }

        function handleMessageInput(event: Event) {
            const target = event.target as HTMLTextAreaElement
            form.message = target.value
        }

        return () => (
            <section class={s.root} id="contact">
                <PageContainer>
                    <SectionHeading
                        index="Контакт"
                        title="Расскажите про участок и задачу"
                        description="Коротко опишите объект, площадь и срок. Мы ответим и честно скажем, берём ли работу."
                    />
                    <div class={s.layout}>
                        <Reveal class={s.aside}>
                            <div class={s.contacts}>
                                <AppLink to={`mailto:${COMPANY.email}`} external>
                                    <TextView tag="span" variant="subheading">{COMPANY.email}</TextView>
                                </AppLink>
                                <AppLink to={COMPANY.phoneHref} external>
                                    <TextView tag="span" variant="subheading">{COMPANY.phone}</TextView>
                                </AppLink>
                            </div>
                            <TextView tag="address" variant="body">{COMPANY.address}</TextView>
                            <TextView variant="caption">
                                Отправляя форму, вы соглашаетесь с обработкой данных и{' '}
                                <AppLink to={ROUTES.privacy}>политикой конфиденциальности</AppLink>.
                            </TextView>
                        </Reveal>
                        {status.value === 'success' ? (
                            <Reveal class={s.success} step={1}>
                                <TextView tag="h3" variant="subheading">Заявка отправлена</TextView>
                                <TextView variant="body">
                                    Мы прочитаем письмо и ответим. Если задача нам не подходит, тоже скажем прямо.
                                </TextView>
                            </Reveal>
                        ) : (
                            <Reveal class={s.formWrap} step={1}>
                                <form class={s.form} onSubmit={handleSubmit} novalidate>
                                    <div class={s.row}>
                                        <FormField id="inquiry-name" label="Имя" error={errors.value.name}>
                                            <input
                                                id="inquiry-name"
                                                name="name"
                                                autocomplete="name"
                                                value={form.name}
                                                onInput={handleNameInput}
                                            />
                                        </FormField>
                                        <FormField id="inquiry-email" label="Email" error={errors.value.email}>
                                            <input
                                                id="inquiry-email"
                                                name="email"
                                                type="email"
                                                autocomplete="email"
                                                value={form.email}
                                                onInput={handleEmailInput}
                                            />
                                        </FormField>
                                    </div>
                                    <div class={s.row}>
                                        <FormField id="inquiry-phone" label="Телефон" error={errors.value.phone}>
                                            <input
                                                id="inquiry-phone"
                                                name="phone"
                                                type="tel"
                                                autocomplete="tel"
                                                value={form.phone}
                                                onInput={handlePhoneInput}
                                            />
                                        </FormField>
                                        <FormField id="inquiry-topic" label="Тип проекта" error={errors.value.topic}>
                                            <select
                                                id="inquiry-topic"
                                                name="topic"
                                                value={form.topic}
                                                onChange={handleTopicChange}
                                            >
                                                {TOPICS.map(([value, label]) => (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormField>
                                    </div>
                                    <FormField id="inquiry-message" label="Задача" error={errors.value.message}>
                                        <textarea
                                            id="inquiry-message"
                                            name="message"
                                            value={form.message}
                                            onInput={handleMessageInput}
                                        />
                                    </FormField>
                                    <div class={s.actions}>
                                        <Button type="submit" disabled={status.value === 'submitting'} arrow>
                                            {status.value === 'submitting' ? 'Отправляем' : 'Отправить заявку'}
                                        </Button>
                                        {serverMessage.value && (
                                            <TextView variant="caption">{serverMessage.value}</TextView>
                                        )}
                                    </div>
                                </form>
                            </Reveal>
                        )}
                    </div>
                </PageContainer>
            </section>
        )
    },
})
