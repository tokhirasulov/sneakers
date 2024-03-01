<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="wrapper">
    <img :src="imageUrl" class="image" alt="Image"/>
    <h2 class="infoTitle">{{ title }}</h2>
    <p class="infoDesc">{{ description }}</p>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 288px;
  margin: 0 auto;
}

.image {
  height: 70px;
  width:70px;
}
.infoTitle {
  margin-top: 20px;
  font-size: 22px;
  font-weight: 500;
}

.infoDesc{
color: rgb(156 163 175);
margin-top: 10px;
}
</style>
