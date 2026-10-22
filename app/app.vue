<script setup lang="ts">
import { AppShell } from '~/components/layout/app-shell/app-shell'
</script>

<template>
    <AppShell>
        <NuxtPage :page-key="(route) => route.fullPath" />
    </AppShell>
</template>
