import { watch } from 'vue'

export function useNavigation() {
    const isOpen = useState('navigation-open', () => false)

    function open() {
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    function toggle() {
        isOpen.value = !isOpen.value
    }

    if (import.meta.client) {
        watch(isOpen, (open) => {
            if (open) {
                document.documentElement.dataset.navOpen = ''
                return
            }

            delete document.documentElement.dataset.navOpen
        })
    }

    return {
        isOpen,
        open,
        close,
        toggle,
    }
}
