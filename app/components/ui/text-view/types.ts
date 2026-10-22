export type TTextTag =
    | 'p'
    | 'span'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'div'
    | 'address'
    | 'figcaption'
    | 'li'
    | 'dt'
    | 'dd'
    | 'blockquote'

export type TTextVariant =
    | 'display'
    | 'title'
    | 'heading'
    | 'subheading'
    | 'lead'
    | 'body'
    | 'caption'
    | 'label'
    | 'number'
    | 'quote'

export type TTextViewProps = {
    tag?: TTextTag
    variant: TTextVariant
}
