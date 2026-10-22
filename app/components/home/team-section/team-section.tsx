import { defineComponent } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { Reveal } from '~/components/ui/reveal/reveal'
import { SectionHeading } from '~/components/ui/section-heading/section-heading'
import { TextView } from '~/components/ui/text-view/text-view'
import { TEAM } from '~/data/team'

import s from './team-section.module.css'

export const TeamSection = defineComponent({
    name: 'TeamSection',

    setup() {
        return () => (
            <section class={s.root}>
                <PageContainer>
                    <SectionHeading
                        index="Команда"
                        title="Архитекторы и руководители проектов"
                        description="Инженеры и смежные специалисты подключаются под состав разделов конкретного проекта."
                    />
                    <div class={s.list}>
                        {TEAM.map((member, index) => (
                            <Reveal tag="article" class={s.item} key={member.id} step={index % 3}>
                                <TextView tag="h3" variant="subheading">{member.name}</TextView>
                                <TextView tag="span" variant="label">{member.role}</TextView>
                            </Reveal>
                        ))}
                    </div>
                </PageContainer>
            </section>
        )
    },
})
