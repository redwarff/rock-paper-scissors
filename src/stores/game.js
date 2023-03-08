import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const gameRunning = ref(false)

  const players = ref([])
  const selectedPlayerId = ref(null)
  const selectedOpponentId = ref(null)
  const results = ref([])
  async function getPlayers() {
    const result = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
    players.value = result
    return result
  }
  function availableOpponentsForPlayer(player1) {
    if (!player1) return []
    return players.value
      .filter(player2 => player2.id !== player1.id)
      .filter(player2 => {
        return results.value.every(entry => entry.playerIds.some(playerId => playerId !== player1.id && playerId !== player2.id))
      })
  }
  const availableOpponents = computed(() => availableOpponentsForPlayer({ id: selectedPlayerId.value }))
  const availablePlayers = computed(() => players.value.filter(player => availableOpponentsForPlayer(player).length))
  function writeResult(winner) {
    results.value.push({
      playerIds: [selectedPlayerId.value, selectedOpponentId.value],
      winner
    })
  }

  const leaderboard = computed(() => players.value
    .map(player => ({
      player,
      score: results.value.filter(entry => entry.winner === player.id).length
    }))
    .sort((a, b) => b.score - a.score)
  )

  return {
    gameRunning,
    players,
    selectedPlayerId,
    selectedOpponentId,
    getPlayers,
    availableOpponents,
    availablePlayers,
    writeResult,  
    leaderboard,
    results,
  }
})
