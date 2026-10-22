<script setup lang="ts">
import type { NuxtError } from '#app'
import { AppShell } from '~/components/layout/app-shell/app-shell'
import { ErrorPage } from '~/components/pages/error/error-page'

const error = useError<NuxtError>()
</script>

<template>
    <AppShell>
        <ErrorPage :error="error" />
    </AppShell>
</template>
