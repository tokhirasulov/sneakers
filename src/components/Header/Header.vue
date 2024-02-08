<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header>
    <div class="header-wrapper">
      <img src="/logo.png" alt="Logo" class="logotype" />
      <div class="text">
        <h2 class="tittle">Tokhir's Sneakers</h2>
        <p>Магазин Лучших Кроссовок</p>
      </div>
    </div>

    <ul class="list-wrapper">
      <li @click="() => emit('openDrawer')">
        <img src="/cart.svg" alt="" />
        <span>{{ totalPrice }} sum</span>
      </li>
      <li>
        <img src="/heart.svg" alt="" />
        <span>Закладки</span>
      </li>
      <li>
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  padding: 32px 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(203, 213, 225);
}
.logotype {
  width: 40px;
}
.header-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.text p {
  color: #9d9d9d;
  font-size: 14px;
}
.tittle {
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
}
.list-wrapper {
  display: flex;
  align-items: center;
  gap: 40px;
}

.list-wrapper li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #5c5c5c;
}
.list-wrapper li span:hover {
  color: #000000;
  cursor: pointer;
}
</style>
