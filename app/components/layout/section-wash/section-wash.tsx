import { defineComponent } from 'vue'

import s from './section-wash.module.css'

export const SectionWash = defineComponent({
    name: 'SectionWash',

    setup(_, { slots }) {
        return () => (
            <>
                <div class={s.wash} aria-hidden="true" />
                <div class={s.content}>{slots.default?.()}</div>
            </>
        )
    },
})
