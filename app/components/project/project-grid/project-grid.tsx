import { defineComponent, onBeforeUpdate, TransitionGroup, type PropType } from 'vue'

import { ProjectCard } from '~/components/project/project-card/project-card'
import { Reveal } from '~/components/ui/reveal/reveal'
import type { TProject } from '~/types/project'

import { ARCHIVE_LAYOUT, FEATURED_LAYOUT } from './constants'
import s from './project-grid.module.css'

export const ProjectGrid = defineComponent({
    name: 'ProjectGrid',

    props: {
        projects: {
            type: Array as PropType<TProject[]>,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const cards = new Map<string, HTMLElement>()
        const positions = new WeakMap<HTMLElement, { bounds: DOMRect; gridBounds: DOMRect }>()

        onBeforeUpdate(() => {
            for (const card of cards.values()) {
                if (!card.parentElement) continue
                positions.set(card, {
                    bounds: card.getBoundingClientRect(),
                    gridBounds: card.parentElement.getBoundingClientRect(),
                })
            }
        })

        function pinLeavingCard(element: Element) {
            const card = element as HTMLElement
            const grid = card.parentElement
            if (!grid) return

            const previous = positions.get(card)
            const bounds = previous?.bounds ?? card.getBoundingClientRect()
            const gridBounds = previous?.gridBounds ?? grid.getBoundingClientRect()
            Object.assign(card.style, {
                width: `${bounds.width}px`,
                height: `${bounds.height}px`,
                left: `${bounds.left - gridBounds.left}px`,
                top: `${bounds.top - gridBounds.top}px`,
            })
            card.inert = true
        }

        function releaseCard(element: Element) {
            const card = element as HTMLElement
            for (const property of ['width', 'height', 'left', 'top']) {
                card.style.removeProperty(property)
            }
            card.inert = false
            positions.delete(card)
        }

        return () => {
            const layout = props.featured ? FEATURED_LAYOUT : ARCHIVE_LAYOUT

            return (
                <TransitionGroup
                    tag="div"
                    class={[s.root, props.featured && s.featuredGrid]}
                    moveClass={s.move}
                    enterActiveClass={s.enterActive}
                    enterFromClass={s.enterFrom}
                    leaveActiveClass={s.leaveActive}
                    leaveToClass={s.leaveTo}
                    onBeforeLeave={pinLeavingCard}
                    onAfterLeave={releaseCard}
                    onLeaveCancelled={releaseCard}
                >
                    {props.projects.map((project, index) => {
                        const card = layout[index % layout.length]

                        return (
                            <div
                                class={s.item}
                                key={project.id}
                                ref={(element) => {
                                    if (element instanceof HTMLElement) cards.set(project.id, element)
                                    else cards.delete(project.id)
                                }}
                            >
                                <Reveal effect="fade">
                                    <ProjectCard
                                        project={project}
                                        priority={index === 0}
                                        ratio={card?.ratio}
                                        sizes={card?.sizes}
                                    />
                                </Reveal>
                            </div>
                        )
                    })}
                </TransitionGroup>
            )
        }
    },
})
