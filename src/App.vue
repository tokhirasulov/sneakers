<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'
import Header from './components/Header/Header.vue'
import CardList from './components/CardList/CardList.vue'
import Drawer from './components/Drawer/Drawer.vue'

const items = ref([])

const card = ref([])

const totalPrice = computed(() => card.value.reduce((acc, item) => acc + item.price, 0))

const isCreatingOrder = ref(false)
const cardButtonDisabled = computed(() =>
  isCreatingOrder.value ? true : totalPrice.value ? false : true
)

const createOrder = async () => {
  isCreatingOrder.value = true
  try {
    const { data } = await axios.post(`https://f7cba7675896fec3.mokky.dev/orders`, {
      items: card.value,
      totalPrice: totalPrice.value
    })
    card.value = []

    return data
  } catch (err) {
    console.log(err)
  }
  isCreatingOrder.value = false
}

const drawerOpen = ref(false)

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const removeFromCard = (item) => {
  card.value.splice(card.value.indexOf(item), 1)
  item.isAdded = false
}

const addToCard = (item) => {
  item.isAdded = true
  card.value.push(item)
}

const handleClick = (item) => {
  if (!item.isAdded) addToCard(item)
  else removeFromCard(item)
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true

      const obj = {
        productId: item.id
      }
      const { data: favorites } = await axios.post(
        `https://f7cba7675896fec3.mokky.dev/favorites`,
        obj
      )
      item.favoriteId = favorites.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://f7cba7675896fec3.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://f7cba7675896fec3.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((fav) => fav.productId === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.productId
      }
    })
  } catch (e) {
    console.log(e)
  }
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const fetchItem = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://f7cba7675896fec3.mokky.dev/items`, {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (e) {
    console.log(e)
  }
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
}

onMounted(async () => {
  const localCard = localStorage.getItem('card')
  card.value = localCard ? JSON.parse(localCard) : []

  await fetchItem()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: card.value.some((cardItem) => cardItem.id === item.id)
  }))
})

watch(card, () => {
  localStorage.setItem('card', JSON.stringify(card.value))
},
{
  deep: true
})

watch(filters, fetchItem)
watch(card, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
provide('card', { closeDrawer, openDrawer, drawerOpen, card, removeFromCard })
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    @createOrder="createOrder"
    :isLoading="cardButtonDisabled"
  />
  <div class="wrapper">
    <Header @open-drawer="openDrawer" :totalPrice="totalPrice" />

    <div class="content-wrapper">
      <div class="header">
        <h2 class="title">Все Кроссовки</h2>

        <div class="filterContainer">
          <select @change="onChangeSelect" class="select">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="inputContainer">
            <img src="/search.svg" class="searchIcon" />
            <input placeholder="Поиск" class="search" @input="onChangeSearch" />
          </div>
        </div>
      </div>
      <CardList :items="items" @addToFavorite="addToFavorite" @add-to-card="handleClick" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 80%;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  margin-top: 56px;
}
.title {
  font-size: 32px;
}

.filterContainer {
  display: flex;
  gap: 16px;
  align-items: center;
}

.select {
  padding: 8px 12px;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  outline: none;
}

.inputContainer {
  position: relative;
}

.searchIcon {
  position: absolute;
  top: 9px;
  left: 10px;
}

.search {
  border: 1px solid #f3f3f3;
  padding: 10px 18px;
  padding-left: 40px;
  border-radius: 10px;
  outline: none;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.content-wrapper {
  padding: 40px;
}
</style>
