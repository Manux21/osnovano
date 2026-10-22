import { isPalette, type TColorMode, type TPalette } from '~/constants/appearance'

export function useAppearance() {
    const paletteCookie = useCookie<string>('osnovano-palette', { sameSite: 'lax', maxAge: 31536000 })
    const modeCookie = useCookie<string>('osnovano-color-mode', { sameSite: 'lax', maxAge: 31536000 })
    const palette = useState<TPalette>('appearance-palette', () => (
        isPalette(paletteCookie.value) ? paletteCookie.value : 'paper'
    ))
    const mode = useState<TColorMode>('appearance-mode', () => (
        modeCookie.value === 'dark' ? 'dark' : 'light'
    ))

    function setPalette(value: TPalette) {
        palette.value = value
        paletteCookie.value = value
    }

    function toggleMode() {
        mode.value = mode.value === 'dark' ? 'light' : 'dark'
        modeCookie.value = mode.value
    }

    function resetAppearance() {
        setPalette('paper')
        mode.value = 'light'
        modeCookie.value = 'light'
    }

    return { palette, mode, setPalette, toggleMode, resetAppearance }
}
