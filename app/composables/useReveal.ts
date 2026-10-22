import { onBeforeUnmount, onMounted, ref } from 'vue'

const OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: '0px 0px -48px 0px',
}

type TUseRevealOptions = {
    animateInitial?: boolean
    observeClosest?: string
    rootMargin?: string
    threshold?: number
}

export function useReveal(options: TUseRevealOptions = {}) {
    const target = ref<HTMLElement | null>(null)
    const isArmed = ref(false)
    const isRevealed = ref(false)
    let observer: IntersectionObserver | null = null
    let armFrame: number | null = null
    let revealFrame: number | null = null

    function stop() {
        observer?.disconnect()
        observer = null

        if (armFrame !== null) {
            cancelAnimationFrame(armFrame)
            armFrame = null
        }

        if (revealFrame !== null) {
            cancelAnimationFrame(revealFrame)
            revealFrame = null
        }
    }

    function revealAfterPaint() {
        armFrame = requestAnimationFrame(() => {
            armFrame = null
            revealFrame = requestAnimationFrame(() => {
                revealFrame = null
                isRevealed.value = true
            })
        })
    }

    onMounted(() => {
        const element = target.value

        if (!element) {
            return
        }

        const observedElement = options.observeClosest
            ? element.closest(options.observeClosest) ?? element
            : element
        const bounds = observedElement.getBoundingClientRect()
        const threshold = options.threshold ?? 0

        if (bounds.bottom <= 0 || (!options.animateInitial && bounds.top < window.innerHeight)) {
            return
        }

        isArmed.value = true

        const visibleHeight = Math.max(
            0,
            Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0),
        )
        const visibleRatio = visibleHeight / Math.max(1, bounds.height)
        const isInitiallyVisible = visibleRatio >= threshold && visibleHeight > 0

        if (options.animateInitial && isInitiallyVisible) {
            revealAfterPaint()
            return
        }

        observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) {
                return
            }

            isRevealed.value = true
            stop()
        }, {
            ...OBSERVER_OPTIONS,
            rootMargin: options.rootMargin ?? OBSERVER_OPTIONS.rootMargin,
            threshold,
        })

        observer.observe(observedElement)
    })

    onBeforeUnmount(stop)

    return {
        target,
        isArmed,
        isRevealed,
    }
}
