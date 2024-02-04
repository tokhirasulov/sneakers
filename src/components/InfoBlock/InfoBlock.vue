<script setup>
    defineProps({
        title: String,
        description:String,
        imageUrl: String
    })
</script>

<template>
    <img :src="imageUrl" class="image"/>
    <h2 class="infoTitle">{{ title }}</h2>
    <p class="infoDesc">{{ description }}</p>
</template>

<style scoped>
    .image{
        height: 280px;
        width: 280px;
    }
    .infoTitle{
        margin-top: 20px;
        font-size: 22px;
    }
</style>