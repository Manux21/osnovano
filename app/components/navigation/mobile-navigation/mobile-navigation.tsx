import { computed, defineComponent } from 'vue'

import { AppLink } from '~/components/ui/app-link/app-link'
import { TextView } from '~/components/ui/text-view/text-view'
import { COMPANY } from '~/data/company'
import { MAIN_NAVIGATION } from '~/data/navigation'

import s from './mobile-navigation.module.css'

export const MobileNavigation = defineComponent({
    name: 'MobileNavigation',

    setup() {
        const { isOpen, close } = useNavigation()

        const inert = computed(() => {
            if (isOpen.value) {
                return undefined
            }

            return true
        })

        function handleNavigate() {
            close()
        }

        return () => (
            <nav
                class={[s.root, isOpen.value && s.open]}
                id="mobile-navigation"
                aria-label="Мобильное меню"
                inert={inert.value}
            >
                <div class={s.list}>
                    {MAIN_NAVIGATION.map((item) => (
                        <NuxtLink
                            key={item.to}
                            class={s.link}
                            to={item.to}
                            onClick={handleNavigate}
                        >
                            <TextView tag="span" variant="title">
                                {item.label}
                            </TextView>
                        </NuxtLink>
                    ))}
                </div>
                <div class={s.contacts}>
                    <AppLink to={`mailto:${COMPANY.email}`} external>
                        <TextView tag="span" variant="body">{COMPANY.email}</TextView>
                    </AppLink>
                    <AppLink to={COMPANY.phoneHref} external>
                        <TextView tag="span" variant="body">{COMPANY.phone}</TextView>
                    </AppLink>
                    <TextView variant="caption">{COMPANY.address}</TextView>
                </div>
            </nav>
        )
    },
})
