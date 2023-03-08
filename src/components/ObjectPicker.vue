<template>
  <div>
    Vyber:
    <button v-for="object in objects" :key="object.value" class="btn btn-primary ms-2"
      @click="$emit('input', object.value)">
      {{ object.label }}
    </button>
  </div>
</template>

<script setup>
const objects = [
  {
    value: 'rock',
    label: 'Kámen',
  },
  {
    value: 'scissors',
    label: 'Nůžky',
  },
  {
    value: 'paper',
    label: 'Papír',
  },
]
</script>