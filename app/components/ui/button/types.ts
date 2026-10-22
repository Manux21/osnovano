export type TButtonVariant = 'primary' | 'outline' | 'inline'

export type TButtonProps = {
    variant?: TButtonVariant
    to?: string
    href?: string
    type?: 'button' | 'submit'
    disabled?: boolean
    arrow?: boolean
}
