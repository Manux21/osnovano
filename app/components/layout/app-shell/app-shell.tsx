import { defineComponent } from 'vue'

import { getPalette } from '~/constants/appearance'

import { AppFooter } from '~/components/layout/app-footer/app-footer'
import { AppHeader } from '~/components/layout/app-header/app-header'
import { MobileNavigation } from '~/components/navigation/mobile-navigation/mobile-navigation'

import s from './app-shell.module.css'

export const AppShell = defineComponent({
    name: 'AppShell',

    setup(_, { slots }) {
        const { palette, mode } = useAppearance()
        useHead(() => {
            const colors = getPalette(palette.value)
            return {
                htmlAttrs: {
                    'data-palette': palette.value,
                    'data-theme': mode.value,
                    style: `--paper:${colors.paper};--ink:${colors.ink};`,
                },
            }
        })

        return () => (
            <div class={s.root}>
                <a class={s.skip} href="#content">
                    Перейти к содержанию
                </a>
                <AppHeader />
                <MobileNavigation />
                <div class={s.main} id="content">
                    {slots.default?.()}
                </div>
                <AppFooter />
            </div>
        )
    },
})
