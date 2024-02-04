<script setup>
  import { inject } from 'vue';

  const {closeDrawer} = inject('card')
</script>


<template>
  <div class="head-wrapper">
    <svg @click="closeDrawer"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="black-icon"
    >
      <path
        d="M1 7H14.7143"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.71436 1L14.7144 7L8.71436 13"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2>Корзина</h2>
  </div>
</template>

<style scoped>
.head-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.black-icon {
  opacity: 0.5;
  rotate: 180deg;
  cursor: pointer;
}
.black-icon:hover {
  opacity: 1;
}
</style>
