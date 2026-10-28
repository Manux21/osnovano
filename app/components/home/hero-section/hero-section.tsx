import { defineComponent, nextTick, onMounted, ref } from 'vue'

import { PageContainer } from '~/components/layout/page-container/page-container'
import { Button } from '~/components/ui/button/button'
import { TextView } from '~/components/ui/text-view/text-view'
import { ROUTES } from '~/constants/routes'

import s from './hero-section.module.css'

const HERO_VIDEOS = [
    '/video/hero-01.mp4',
    '/video/hero-02.mp4',
    '/video/hero-03.mp4',
    '/video/hero-04.mp4',
    '/video/hero-05.mp4',
]

export const HeroSection = defineComponent({
    name: 'HeroSection',

    setup() {
        const assetPath = useAssetPath()
        const activeVideoIndex = ref(0)
        const videoElements = ref<Array<HTMLVideoElement | null>>([])

        async function switchToVideo(nextIndex: number) {
            const currentIndex = activeVideoIndex.value
            const currentVideo = videoElements.value[currentIndex]
            const nextVideo = videoElements.value[nextIndex]

            if (!nextVideo) return

            try {
                nextVideo.currentTime = 0
                await nextVideo.play()
                activeVideoIndex.value = nextIndex
                await nextTick()
                currentVideo?.pause()
                if (currentVideo) currentVideo.currentTime = 0
            } catch {
                const fallbackIndex = (nextIndex + 1) % HERO_VIDEOS.length
                if (fallbackIndex !== currentIndex) await switchToVideo(fallbackIndex)
            }
        }

        function playNextVideo() {
            void switchToVideo((activeVideoIndex.value + 1) % HERO_VIDEOS.length)
        }

        onMounted(() => {
            void videoElements.value[0]?.play()
        })

        return () => (
            <section class={s.root} data-header-tone="dark">
                <div
                    class={s.scene}
                    style={{ '--hero-poster': `url(${assetPath('/images/projects/barvikha/cover.jpg')})` }}
                    aria-hidden="true"
                >
                    {HERO_VIDEOS.map((video, index) => (
                        <video
                            key={video}
                            ref={(element) => {
                                videoElements.value[index] = element as HTMLVideoElement | null
                            }}
                            class={[s.video, index === activeVideoIndex.value && s.videoActive]}
                            src={assetPath(video)}
                            autoplay={index === 0}
                            muted
                            playsinline
                            preload="auto"
                            poster={index === 0 ? assetPath('/images/projects/barvikha/cover.jpg') : undefined}
                            onEnded={index === activeVideoIndex.value ? playNextVideo : undefined}
                        />
                    ))}
                    <span class={s.photoVeil} />
                </div>
                <PageContainer>
                    <div class={s.frame}>
                        <div class={s.content}>
                            <h1 class={s.heroTitle}>
                                <span>От идеи —</span>
                                <span>к{'\u00a0'}пространству</span>
                                <span>для жизни</span>
                            </h1>
                            <TextView class={s.description} variant="lead">
                                Создаём архитектуру, которая вдохновляет, объединяет людей и становится частью вашей истории.
                            </TextView>
                            <div class={s.actions}>
                                <Button to={ROUTES.projects} variant="outline" arrow>
                                    Смотреть проекты
                                </Button>
                                <Button to={ROUTES.contact} variant="inline">
                                    Обсудить проект
                                </Button>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>
        )
    },
})
