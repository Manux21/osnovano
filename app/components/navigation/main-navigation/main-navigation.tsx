import { computed, defineComponent } from 'vue'

import { TextView } from '~/components/ui/text-view/text-view'
import { MAIN_NAVIGATION } from '~/data/navigation'

import s from './main-navigation.module.css'

export const MainNavigation = defineComponent({
    name: 'MainNavigation',

    setup() {
        const route = useRoute()
        const { close } = useNavigation()

        const items = computed(() => MAIN_NAVIGATION)

        function isActive(to: string) {
            const [path, hash] = to.split('#')
            const pathname = path || '/'

            if (hash) {
                return route.path === pathname && route.hash === `#${hash}`
            }

            if (pathname === '/') {
                return route.path === '/'
            }

            return route.path === pathname || route.path.startsWith(`${pathname}/`)
        }

        function handleNavigate() {
            close()
        }

        return () => (
            <nav class={s.root} aria-label="Основное меню">
                {items.value.map((item) => (
                    <NuxtLink
                        key={item.to}
                        class={[s.link, isActive(item.to) && s.active]}
                        to={item.to}
                        onClick={handleNavigate}
                    >
                        <TextView tag="span" variant="label">
                            {item.label}
                        </TextView>
                    </NuxtLink>
                ))}
            </nav>
        )
    },
})
