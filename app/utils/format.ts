export function formatArea(area: number): string {
    return `${area.toLocaleString('ru-RU')} м²`
}

export function splitParagraphs(text: string): string[] {
    return text
        .split(/\n+/)
        .map((part) => part.trim())
        .filter(Boolean)
}
