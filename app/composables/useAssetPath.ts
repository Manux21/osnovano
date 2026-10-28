export function useAssetPath() {
    const { app } = useRuntimeConfig()

    return (path: string) => path.startsWith('/') && !path.startsWith('//')
        ? `${app.baseURL.replace(/\/$/, '')}${path}`
        : path
}
