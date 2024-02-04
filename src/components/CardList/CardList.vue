<script setup>
import Card from '../Card/Card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCard'])
</script>

<template>
  <div class="all-sneakers">
    <Card
      :key="item.id"
      :id="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      :onAddToCard="() => emit('addToCard', item)"
      :onAddToFavorite="() => emit('addToFavorite', item)"
      v-for="item in items"
    />
  </div>
</template>

<style>
.all-sneakers {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 20px;
}
</style>
