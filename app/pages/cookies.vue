<script setup lang="ts">
import { LegalPage } from '~/components/pages/legal/legal-page'
import { getLegalPage } from '~/data/legal'

const page = getLegalPage('cookies')

if (!page) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Страница не найдена',
    })
}
</script>

<template>
    <LegalPage :page="page" />
</template>
