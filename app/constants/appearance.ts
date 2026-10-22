export const PALETTES = [
    { id: 'mono', name: 'Чёрно-белая', description: 'Чистый белый и чёрный', paper: '#ffffff', ink: '#080808' },
    { id: 'paper', name: 'Бумага', description: 'Исходная тёплая палитра', paper: '#f1efea', ink: '#161511' },
    { id: 'sand', name: 'Песчаник', description: 'Слоновая кость и эспрессо', paper: '#fff2db', ink: '#3a2417' },
    { id: 'terracotta', name: 'Терракота', description: 'Светлая глина и кирпич', paper: '#fff0e5', ink: '#6b2d22' },
    { id: 'burgundy', name: 'Бордо', description: 'Пудровый белый и вино', paper: '#fff0f1', ink: '#4b1426' },
    { id: 'sage', name: 'Хвойный', description: 'Льняной зелёный и хвоя', paper: '#edf4dd', ink: '#18382e' },
    { id: 'olive', name: 'Олива', description: 'Светлый лён и оливковый', paper: '#f2f0cf', ink: '#3b4317' },
    { id: 'slate', name: 'Кобальт', description: 'Холодный белый и синий', paper: '#edf2ff', ink: '#183b7a' },
    { id: 'petrol', name: 'Петроль', description: 'Ледяной мятный и нефть', paper: '#e1f5f3', ink: '#123e48' },
    { id: 'aubergine', name: 'Баклажан', description: 'Светлая лаванда и сливовый', paper: '#f1eafa', ink: '#362044' },
] as const

export type TPalette = typeof PALETTES[number]['id']
export type TColorMode = 'light' | 'dark'

export function isPalette(value: unknown): value is TPalette {
    return PALETTES.some((palette) => palette.id === value)
}

export function getPalette(value: TPalette) {
    return PALETTES.find((palette) => palette.id === value) ?? PALETTES[1]
}
