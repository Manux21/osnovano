import { defineComponent } from 'vue'

import { TextView } from '~/components/ui/text-view/text-view'

import s from './form-field.module.css'

export const FormField = defineComponent({
    name: 'FormField',

    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            default: undefined,
        },
    },

    setup(props, { slots }) {
        return () => (
            <label class={[s.root, props.error && s.invalid]} for={props.id}>
                <TextView tag="span" variant="label">
                    {props.label}
                </TextView>
                <div class={s.control}>{slots.default?.()}</div>
                {props.error && (
                    <span class={s.error}>
                        <TextView tag="span" variant="label">
                            {props.error}
                        </TextView>
                    </span>
                )}
            </label>
        )
    },
})
