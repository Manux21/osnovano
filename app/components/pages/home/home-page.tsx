import { defineComponent } from 'vue'

import { AboutSection } from '~/components/home/about-section/about-section'
import { ContactSection } from '~/components/home/contact-section/contact-section'
import { FaqSection } from '~/components/home/faq-section/faq-section'
import { HeroSection } from '~/components/home/hero-section/hero-section'
import { ManifestoSection } from '~/components/home/manifesto-section/manifesto-section'
import { ProcessSection } from '~/components/home/process-section/process-section'
import { ProjectsSection } from '~/components/home/projects-section/projects-section'
import { ServicesSection } from '~/components/home/services-section/services-section'
import { StatsSection } from '~/components/home/stats-section/stats-section'
import { TeamSection } from '~/components/home/team-section/team-section'
import { SITE_DESCRIPTION, SITE_TAGLINE } from '~/constants/site'

import s from './home-page.module.css'

export const HomePage = defineComponent({
    name: 'HomePage',

    setup() {
        usePageSeo({
            title: SITE_TAGLINE,
            description: SITE_DESCRIPTION,
            path: '/',
        })

        return () => (
            <main class={s.root}>
                <HeroSection />
                <ProjectsSection />
                <ManifestoSection />
                <ServicesSection />
                <ProcessSection />
                <AboutSection />
                <StatsSection />
                <TeamSection />
                <FaqSection />
                <ContactSection />
            </main>
        )
    },
})
