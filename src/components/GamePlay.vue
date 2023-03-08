<template>
  <div class="row mb-3">
    <h3 class="col">Kolo: {{ wins.length + 1 }} / 3</h3>
  </div>
  <div class="row">
    <div class="col">
      <div>Hráč 1</div>
      <div class="fw-bold">{{ playerName }}</div>
      <div>Výher: {{ playerWins }}</div>
      <ObjectPicker v-if="!playerChoice" @input="value => playerChoice = value" class="mt-3"></ObjectPicker>
    </div>
    <div class="col">
      <div>Hráč 2</div>
      <div class="fw-bold">{{ opponentName }}</div>
      <div>Výher: {{ opponentWins }}</div>
      <ObjectPicker v-if="playerChoice && !opponentChoice" @input="value => opponentChoice = value" class="mt-3">
      </ObjectPicker>
    </div>
  </div>
  <div v-if="playerChoice && opponentChoice" class="row mt-5">
    <div class="col">
      <div>
        {{ resultMessage }}
      </div>
      <button class="btn btn-primary mt-2" @click="nextStep">Pokračovat</button>
    </div>
  </div>
</template>

<script setup>
import ObjectPicker from '@/components/ObjectPicker.vue'
import { useGameStore } from '@/stores/game'
import { ref, computed } from 'vue'

const store = useGameStore()
const playerName = computed(() => store.players.find(player => player.id === store.selectedPlayerId).username)
const opponentName = computed(() => store.players.find(player => player.id === store.selectedOpponentId).username)

const wins = ref([])
const playerWins = computed(() => wins.value.filter(playerId => playerId === store.selectedPlayerId).length)
const opponentWins = computed(() => wins.value.filter(playerId => playerId === store.selectedOpponentId).length)

const playerChoice = ref(null)
const opponentChoice = ref(null)
const winnerObject = computed(() => {
  const winOrder = ['paper', 'scissors', 'rock']
  const winMap = [opponentChoice.value, null, playerChoice.value]
  const winIndex = ((winOrder.indexOf(playerChoice.value) - winOrder.indexOf(opponentChoice.value)) + 4) % 3
  return winMap[winIndex]
})
const resultMessage = computed(() => {
  if (!winnerObject.value) return 'Remíza, opakujte kolo'
  if (winnerObject.value === playerChoice.value) return 'Kolo vyhrává hráč 1'
  return 'Kolo vyhrává hráč 2'
})

const nextStep = () => {
  if (winnerObject.value === playerChoice.value) {
    wins.value.push(store.selectedPlayerId)
  } else if (winnerObject.value === opponentChoice.value) {
    wins.value.push(store.selectedOpponentId)
  }
  playerChoice.value = null
  opponentChoice.value = null
  if (wins.value.length === 3) {
    const winnerId = playerWins.value > 1 ? store.selectedPlayerId : store.selectedOpponentId
    store.writeResult(winnerId)
    store.gameRunning = false
  }
}
</script>