import { onBeforeUnmount, onMounted, ref } from 'vue'

const SCROLLED_OFFSET = 8
const HIDE_OFFSET = 280

export function useScrollState() {
    const isScrolled = ref(false)
    const isScrollingDown = ref(false)
    let lastY = 0

    function handleScroll() {
        const y = window.scrollY

        isScrolled.value = y > SCROLLED_OFFSET
        isScrollingDown.value = y > HIDE_OFFSET && y > lastY
        lastY = y
    }

    onMounted(() => {
        lastY = window.scrollY
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    return {
        isScrolled,
        isScrollingDown,
    }
}
