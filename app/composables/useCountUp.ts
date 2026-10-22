import { onBeforeUnmount, onMounted, ref } from 'vue'

import { clamp, easeOutCubic, prefersReducedMotion } from '~/utils/motion'

const DURATION = 1600
const GROUP_PATTERN = /\B(?=(\d{3})+(?!\d))/g
const GROUPED_SOURCE = /\d[\s\u00a0]\d/

function format(amount: number, separator: string): string {
    return String(amount).replace(GROUP_PATTERN, separator)
}

export function useCountUp(value: string) {
    const target = ref<HTMLElement | null>(null)
    const display = ref(value)

    const amount = Number(value.replace(/\D/g, ''))
    const separator = GROUPED_SOURCE.test(value) ? ' ' : ''

    let observer: IntersectionObserver | null = null
    let frame = 0
    let startedAt = 0

    function stop() {
        observer?.disconnect()
        observer = null
    }

    function step(time: number) {
        if (!startedAt) {
            startedAt = time
        }

        const progress = clamp((time - startedAt) / DURATION)

        display.value = format(Math.round(amount * easeOutCubic(progress)), separator)

        if (progress < 1) {
            frame = requestAnimationFrame(step)
        }
    }

    onMounted(() => {
        const element = target.value

        if (!element || !amount || prefersReducedMotion()) {
            return
        }

        display.value = format(0, separator)

        observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
                return
            }

            stop()
            frame = requestAnimationFrame(step)
        })

        observer.observe(element)
    })

    onBeforeUnmount(() => {
        stop()
        cancelAnimationFrame(frame)
    })

    return {
        target,
        display,
    }
}
