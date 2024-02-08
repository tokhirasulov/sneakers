<script setup>
import DrawerHead from './DrawerHead.vue'
import CardItemList from '../CardItemList/CardItemList.vue'
import { inject, computed } from 'vue'

const props = defineProps({
  totalPrice: Number,
  isLoading: Boolean
})

const vatPrice = computed(() => Math.round((props.totalPrice * 2) / 100))

const emit = defineEmits(['createOrder'])

const { drawerOpen } = inject('card')
</script>

<template>
  <div class="background"></div>
  <div :class="{ content: true, active: drawerOpen }">
    <DrawerHead />
    <CardItemList />

    <div class="lowerSection">
      <div class="allPrice">
        <span>Итого:</span>
        <div class="line"></div>
        <b>{{ totalPrice }} sum</b>
      </div>

      <div class="tax">
        <span>Налог 2%:</span>
        <div class="line"></div>
        <b>{{ vatPrice }} sum</b>
      </div>
    </div>

    <button class="checkout" :disabled="isLoading" @click="() => emit('createOrder')">
      <span>Оформить заказ</span>
      <!-- <img src="/arrow-next.svg" alt="next" class="nextIcon"/> -->
    </button>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000;
  opacity: 0.7;
  z-index: 10;
}
.content {
  background: white;
  width: 385px;
  height: 100%;
  position: fixed;
  padding: 32px;
  z-index: 11;
  top: 0;
  right: -400px;
  transition: right 10s ease;
}

.active {
  right: 0;
}

.line {
  flex: 1;
  border-bottom: 1px dashed #dfdfdf;
}

.checkout {
  width: 100%;
  background: #9dd458;
  border: none;
  border-radius: 18px;
  color: white;
  font-family: 'Inter', sans-serif;
  padding: 18px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  cursor: pointer;
  transition: ease 0.3s;
}

.checkout:disabled {
  cursor: not-allowed;
  background: #dfdfdf;
}

.checkout:disabled:hover {
  cursor: not-allowed;
  background: #dfdfdf;
}

.checkout:hover {
  background: #95ca54;
}

.nextIcon {
  justify-self: flex-end;
}

.lowerSection {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.allPrice,
.tax {
  display: flex;
  gap: 8px;
  align-items: flex-end;
}
</style>
