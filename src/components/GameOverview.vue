<template>
  <div class="row">
    <div class="col">
      <label for="player" class="form-label">
        <img src="@/assets/user.png" width="32" />
        První hráč
      </label>
      <select v-model="store.selectedPlayerId" class="form-select" id="player" aria-label="Výběr hráče">
        <option v-for="player in store.availablePlayers" :key="player.id" :value="player.id">{{ player.username }}
        </option>
      </select>
    </div>
    <div class="col">
      <label for="opponent" class="form-label">
        <img src="@/assets/user.png" width="32" />
        Druhý hráč
      </label>
      <select v-model="store.selectedOpponentId" class="form-select" id="opponent" aria-label="Výběr hráče"
        :disabled="!store.selectedPlayerId">
        <option v-for="player in store.availableOpponents" :key="player.id" :value="player.id">{{ player.username }}
        </option>
      </select>
    </div>
  </div>
  <button type="button" class="btn btn-primary mt-3" :disabled="!store.selectedPlayerId || !store.selectedOpponentId"
    @click="store.gameRunning = true">Hrát</button>
  <table class="table mt-5">
    <thead>
      <tr>
        <th>Hráč</th>
        <th>Skóre</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in store.leaderboard" :key="entry.player.id">
        <td>{{ entry.player.username }}</td>
        <td>{{ entry.score }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useGameStore } from '@/stores/game'

const store = useGameStore()
store.selectedPlayerId = null
store.selectedOpponentId = null
</script>

<style scoped></style>
