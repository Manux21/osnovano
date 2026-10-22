import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

// Read the semantic surface beneath the fixed header, excluding its own glass.
export function useHeaderTone(header: Ref<HTMLElement | null>) {
    const route = useRoute()
    const nuxtApp = useNuxtApp()
    const { mode } = useAppearance()
    const tone = ref<'light' | 'dark'>(route.path === '/' ? 'dark' : mode.value)
    const onMedia = ref(route.path === '/')
    let frame: number | undefined
    let observer: MutationObserver | undefined
    let layoutObserver: ResizeObserver | undefined
    const removePageHooks: Array<() => void> = []

    function update() {
        frame = undefined
        const element = header.value
        if (!element) return
        const bounds = element.getBoundingClientRect()
        const sampleY = bounds.top + bounds.height / 2
        const media = document.querySelector<HTMLElement>('#content [data-header-tone]')
        const mediaBounds = media?.getBoundingClientRect()
        if (media && mediaBounds && mediaBounds.top <= sampleY && mediaBounds.bottom > sampleY) {
            tone.value = media.dataset.headerTone === 'dark' ? 'dark' : 'light'
            onMedia.value = true
            return
        }

        const underneath = document.elementsFromPoint(window.innerWidth / 2, sampleY)
            .find((candidate) => !element.contains(candidate) && candidate.closest('#content, footer'))
        const surface = underneath?.closest<HTMLElement>('[data-header-tone], [data-theme]')
        tone.value = (surface?.dataset.headerTone ?? surface?.dataset.theme ?? mode.value) === 'dark' ? 'dark' : 'light'
        onMedia.value = Boolean(underneath?.closest('[data-header-tone]'))
    }

    function schedule() {
        if (frame === undefined) frame = requestAnimationFrame(update)
    }

    watch(() => route.fullPath, schedule, { flush: 'post' })
    watch(mode, schedule, { flush: 'post' })

    onMounted(() => {
        schedule()
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule, { passive: true })
        observer = new MutationObserver(schedule)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-palette'] })
        removePageHooks.push(nuxtApp.hook('page:finish', schedule))
        removePageHooks.push(nuxtApp.hook('page:transition:finish', schedule))
        const content = document.getElementById('content')
        if (content) {
            layoutObserver = new ResizeObserver(schedule)
            layoutObserver.observe(content)
        }
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        observer?.disconnect()
        layoutObserver?.disconnect()
        removePageHooks.forEach((remove) => remove())
        if (frame !== undefined) cancelAnimationFrame(frame)
    })

    return { tone, onMedia }
}
