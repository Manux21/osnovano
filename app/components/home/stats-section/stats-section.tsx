import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { SectionWash } from '~/components/layout/section-wash/section-wash'
import { STATS } from '~/data/stats'

import { StatItem } from './stat-item/stat-item'
import s from './stats-section.module.css'

export const StatsSection = defineComponent({
    name: 'StatsSection',

    setup() {
        return () => (
            <section class={s.root} data-theme="dark">
                <SectionWash>
                    <PageContainer>
                        <div class={s.list}>
                            {STATS.map((stat, index) => (
                                <StatItem
                                    key={stat.id}
                                    value={stat.value}
                                    label={stat.label}
                                    step={index}
                                />
                            ))}
                        </div>
                    </PageContainer>
                </SectionWash>
            </section>
        )
    },
})
