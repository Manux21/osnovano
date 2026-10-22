import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { AppLink } from '~/components/ui/app-link/app-link'
import { Button } from '~/components/ui/button/button'
import { Logo } from '~/components/ui/logo/logo'
import { TextView } from '~/components/ui/text-view/text-view'
import { COMPANY } from '~/data/company'
import { FOOTER_NAVIGATION, LEGAL_NAVIGATION } from '~/data/navigation'

import s from './app-footer.module.css'

export const AppFooter = defineComponent({
    name: 'AppFooter',

    setup() {
        const year = new Date().getFullYear()

        return () => (
            <footer class={s.root} data-theme="dark">
                <PageContainer>
                    <div class={s.top}>
                        <div class={s.brand}>
                            <TextView tag="span" variant="label">
                                {COMPANY.tagline}, {COMPANY.city}
                            </TextView>
                            <TextView tag="p" variant="subheading">
                                {COMPANY.description}
                            </TextView>
                        </div>
                        <div class={s.columns}>
                            <div class={s.column}>
                                <TextView tag="span" variant="label">Навигация</TextView>
                                <div class={s.links}>
                                    {FOOTER_NAVIGATION.map((item) => (
                                        <Button key={item.to} to={item.to} variant="inline">
                                            {item.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <address class={s.column}>
                                <TextView tag="span" variant="label">Контакты</TextView>
                                <div class={s.links}>
                                    <AppLink to={`mailto:${COMPANY.email}`} external>
                                        <TextView tag="span" variant="body">{COMPANY.email}</TextView>
                                    </AppLink>
                                    <AppLink to={COMPANY.phoneHref} external>
                                        <TextView tag="span" variant="body">{COMPANY.phone}</TextView>
                                    </AppLink>
                                    <TextView variant="caption">{COMPANY.address}</TextView>
                                </div>
                            </address>
                            <div class={s.column}>
                                <TextView tag="span" variant="label">Документы</TextView>
                                <div class={s.links}>
                                    {LEGAL_NAVIGATION.map((item) => (
                                        <AppLink key={item.to} to={item.to}>
                                            <TextView tag="span" variant="caption">{item.label}</TextView>
                                        </AppLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Logo size="full" />
                    <div class={s.bottom}>
                        <TextView tag="span" variant="label">
                            © {year} {COMPANY.legalName}
                        </TextView>
                        <TextView tag="span" variant="label">
                            {COMPANY.founded} — {year}
                        </TextView>
                    </div>
                </PageContainer>
            </footer>
        )
    },
})
