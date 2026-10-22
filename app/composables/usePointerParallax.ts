import { onBeforeUnmount, onMounted, ref } from 'vue'

import { hasFinePointer, prefersReducedMotion } from '~/utils/motion'

export function usePointerParallax() {
    const offsetX = ref(0)
    const offsetY = ref(0)
    let frame = 0

    function handleMove(event: PointerEvent) {
        if (frame) {
            return
        }

        frame = requestAnimationFrame(() => {
            frame = 0
            offsetX.value = (event.clientX / window.innerWidth) * 2 - 1
            offsetY.value = (event.clientY / window.innerHeight) * 2 - 1
        })
    }

    onMounted(() => {
        if (prefersReducedMotion() || !hasFinePointer()) {
            return
        }

        window.addEventListener('pointermove', handleMove, { passive: true })
    })

    onBeforeUnmount(() => {
        window.removeEventListener('pointermove', handleMove)
        cancelAnimationFrame(frame)
    })

    return {
        offsetX,
        offsetY,
    }
}
