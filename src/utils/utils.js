export const fetchItem = async (filters, source) => {
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
    items.value = data
  } catch (e) {
    console.log(e)
  }
}
