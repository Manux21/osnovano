import { computed, defineComponent, ref } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { MainNavigation } from '~/components/navigation/main-navigation/main-navigation'
import { Logo } from '~/components/ui/logo/logo'
import { AppearanceControls } from '~/components/ui/appearance-controls/appearance-controls'
import { TextView } from '~/components/ui/text-view/text-view'
import { ROUTES } from '~/constants/routes'

import s from './app-header.module.css'

export const AppHeader = defineComponent({
    name: 'AppHeader',

    setup() {
        const { toggle, isOpen } = useNavigation()
        const { isScrolled } = useScrollState()
        const header = ref<HTMLElement | null>(null)
        const { tone, onMedia } = useHeaderTone(header)
        const { mode } = useAppearance()
        const isDark = computed(() => (isOpen.value ? mode.value === 'dark' : tone.value === 'dark'))

        function handleToggle() {
            toggle()
        }

        return () => (
            <header
                ref={header}
                class={[
                    s.root,
                    isDark.value && s.dark,
                    onMedia.value && !isOpen.value && s.onMedia,
                    isScrolled.value && s.scrolled,
                    isOpen.value && s.over,
                ]}
            >
                <PageContainer>
                    <div class={s.inner}>
                        <AppearanceControls />
                        <NuxtLink class={s.logo} to={ROUTES.home}>
                            <Logo />
                        </NuxtLink>
                        <div class={s.desktop}>
                            <MainNavigation />
                        </div>
                        <button
                            class={s.menu}
                            type="button"
                            aria-expanded={isOpen.value}
                            aria-controls="mobile-navigation"
                            onClick={handleToggle}
                        >
                            <TextView tag="span" variant="label">
                                {isOpen.value ? 'Закрыть' : 'Меню'}
                            </TextView>
                        </button>
                    </div>
                </PageContainer>
            </header>
        )
    },
})
