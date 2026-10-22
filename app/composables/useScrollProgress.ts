import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { TScrollProgressMode } from '~/types/motion'
import { clamp, prefersReducedMotion } from '~/utils/motion'

export function useScrollProgress(mode: TScrollProgressMode = 'enter') {
    const target = ref<HTMLElement | null>(null)
    const progress = ref(0)
    let frame = 0

    function measure() {
        frame = 0

        const element = target.value

        if (!element) {
            return
        }

        const rect = element.getBoundingClientRect()

        if (mode === 'exit') {
            progress.value = clamp(-rect.top / rect.height)

            return
        }

        progress.value = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height))
    }

    function handleScroll() {
        if (frame) {
            return
        }

        frame = requestAnimationFrame(measure)
    }

    onMounted(() => {
        if (prefersReducedMotion()) {
            progress.value = mode === 'exit' ? 0 : 1

            return
        }

        measure()
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
        cancelAnimationFrame(frame)
    })

    return {
        target,
        progress,
    }
}
