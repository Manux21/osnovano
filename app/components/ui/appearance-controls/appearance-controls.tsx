import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { getPalette, PALETTES } from '~/constants/appearance'

import s from './appearance-controls.module.css'

export const AppearanceControls = defineComponent({
    name: 'AppearanceControls',
    setup() {
        const { palette, mode, setPalette, toggleMode, resetAppearance } = useAppearance()
        const current = computed(() => getPalette(palette.value))
        const root = ref<HTMLElement | null>(null)
        const chooser = ref<HTMLDetailsElement | null>(null)

        function closeOnOutside(event: PointerEvent) {
            if (chooser.value?.open && event.target instanceof Node && !root.value?.contains(event.target)) {
                chooser.value.open = false
            }
        }

        onMounted(() => document.addEventListener('pointerdown', closeOnOutside))
        onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutside))

        return () => (
            <div ref={root} class={s.root} aria-label="Тест оформления сайта">
                <details
                    ref={chooser}
                    class={s.chooser}
                    onKeydown={(event: KeyboardEvent) => {
                        if (event.key === 'Escape' && chooser.value) {
                            chooser.value.open = false
                            chooser.value.querySelector('summary')?.focus()
                        }
                    }}
                >
                    <summary class={s.choose} aria-label="Выбрать палитру сайта" title="Палитры сайта">
                        <span class={s.swatch} style={{ '--swatch-paper': current.value.paper, '--swatch-ink': current.value.ink }} aria-hidden="true" />
                        <span class={s.label}>Палитры</span>
                        <svg class={s.chevron} viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
                    </summary>
                    <div class={s.popover}>
                        <div class={s.heading}>
                            <span>Цвет сайта</span>
                            <span class={s.count}>{PALETTES.length} палитр</span>
                        </div>
                        <div class={s.grid} role="group" aria-label="Палитра сайта">
                            {PALETTES.map((item) => (
                                <button
                                    class={[s.option, palette.value === item.id && s.selected]}
                                    type="button"
                                    aria-label={`Палитра «${item.name}»`}
                                    aria-pressed={palette.value === item.id}
                                    title={item.description}
                                    onClick={() => setPalette(item.id)}
                                    key={item.id}
                                >
                                    <span class={s.swatch} style={{ '--swatch-paper': item.paper, '--swatch-ink': item.ink }} aria-hidden="true" />
                                    <span class={s.copy}>
                                        <span class={s.name}>{item.name}</span>
                                        <span class={s.description}>{item.description}</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </details>
                <span class={s.separator} aria-hidden="true" />
                <button
                    class={s.mode}
                    type="button"
                    aria-label={mode.value === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
                    aria-pressed={mode.value === 'dark'}
                    title={mode.value === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
                    onClick={toggleMode}
                >
                    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        {mode.value === 'dark' ? (
                            <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4L19 5" /></>
                        ) : (
                            <path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6a8.5 8.5 0 1 0 10.6 10.6Z" />
                        )}
                    </svg>
                </button>
                <button
                    class={s.reset}
                    type="button"
                    aria-label="Исходная тема"
                    title="Вернуть исходную палитру и светлую тему"
                    onClick={() => {
                        resetAppearance()
                        if (chooser.value) chooser.value.open = false
                    }}
                >
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M4 10a8 8 0 1 1 1.7 7M4 4v6h6" />
                    </svg>
                    <span class={s.resetLabel}>Исходная тема</span>
                </button>
            </div>
        )
    },
})
