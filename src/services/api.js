export async function getCategories() {
  const urlCategories = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const resultsCategories = urlCategories.json();
  return resultsCategories;
}

export async function getProductsFromCategoryAndQuery(category, query) {
  const urlCategoriesQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}&${query}`);
  const resultsCategoriesQuery = urlCategoriesQuery.json();
  return resultsCategoriesQuery;
}

export async function getProductsFromQuery(query) {
  const urlQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const resultsQuery = urlQuery.json();
  return resultsQuery;
}
export async function getProductID(ID) {
  const urlID = await fetch(`https://api.mercadolibre.com/items/${ID}`);
  const resultsID = urlID.json();
  return resultsID;
}
