<script setup>


  defineProps({
    title: String,
    id: Number,
    price: Number,
    imageUrl: String
  })

  const emit = defineEmits(['onClickRemove'])
</script>


<template>
  <div class="cardWrapper">
    <img :src="imageUrl" alt="Sneakers" class="sneakers" />

    <div class="innerInfo">
      <p>{{title}}</p>

      <div class="price">
        <b>{{ price }} sum</b>
        <img src="/close.svg" alt="close" class="closeIcon" @click="() => emit('onClickRemove')"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardWrapper {
  border: 1px solid #f3f3f3;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.innerInfo {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.price {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.closeIcon {
  opacity: 0.4;
  transition: 0.2s;
  cursor: pointer;
}

.closeIcon:hover {
  opacity: 1;
}

.sneakers {
  width: 64px;
  height: 64px;
}
</style>
