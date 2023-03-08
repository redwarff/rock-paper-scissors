<template>
  <main class="container mt-5">
    <h1>Kámen, nůžky, papír</h1>
    <GamePlay v-if="store.gameRunning"></GamePlay>
    <GameOverview v-else></GameOverview>
  </main>
</template>

<script setup>
import GameOverview from '@/components/GameOverview.vue'
import GamePlay from '@/components/GamePlay.vue'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
store.getPlayers()
</script>