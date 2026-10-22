const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)'

export function prefersReducedMotion(): boolean {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function hasFinePointer(): boolean {
    return window.matchMedia(FINE_POINTER_QUERY).matches
}

export function clamp(value: number, min = 0, max = 1): number {
    return Math.min(Math.max(value, min), max)
}

export function easeOutCubic(progress: number): number {
    return 1 - (1 - progress) ** 3
}
