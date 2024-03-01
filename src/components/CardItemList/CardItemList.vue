<script setup>
import { inject } from 'vue'
import CardItem from '../CardItem/CardItem.vue'

const { card, removeFromCard } = inject('card')
</script>

<template>
  <div class="wrapper" v-auto-animate>
    <CardItem
      v-for="item in card"
      @onClickRemove="() => removeFromCard(item)"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :id="item.id"
      :imageUrl="item.imageUrl"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
