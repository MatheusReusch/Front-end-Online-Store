export async function getCategories() {
  return fetch("https://api.mercadolibre.com/sites/MLB/categories")
  .then((resolve) => resolve.json())
  .then((data) => data)
}

export async function getProductsFromCategoryAndQuery(categoryId, query ) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
  .then((resolve) => resolve.json())
  .then((data) => data)
}
