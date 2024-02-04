<script setup>
defineProps({
  imageUrl: String,
  id: Number,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onAddToFavorite: Function,
    onAddToCard: Function
})
</script>

<template>
  <div class="card-container">
    <img
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="like"
      class="like"
      @click="onAddToFavorite"
    />
    <img :src="imageUrl" alt="Sneakers" class="sneakers" />
    <p class="info">{{ title }}</p>

    <div class="info-wrapper">
      <div class="price-wrapper">
        <span class="price">Цена:</span>
        <b class="priceNumber">{{ price }} sum</b>
      </div>

      <img @click="onAddToCard" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative;
  background: white;

  border: 1px solid #f3f3f3;
  border-radius: 40px;
  padding: 32px;
  cursor: pointer;
  transition: 0.3s;
}

.card-container:hover {
  translate: 0 -8px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.sneakers {
  width: 100%;
}

.info {
  margin-top: 8px;
  font-size: 14px;
}

.like {
  position: absolute;
  top: 32px;
  left: 32px;
}

.info-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.price-wrapper {
  display: flex;
  flex-direction: column;
}
.price {
  color: #bdbdbd;
}
</style>
