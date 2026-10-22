export type TRevealTag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'figure' | 'li'

export type TRevealEffect = 'up' | 'fade' | 'mask'

export type TRevealProps = {
    tag?: TRevealTag
    effect?: TRevealEffect
    step?: number
}
