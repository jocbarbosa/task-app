const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getProductsById(ids) {
    return products.filter((product) => ids.includes(product.id));
}
function getPromotion(productsList) {
    const productCategories = productsList.map((prod) => prod.category);

    const length = promotions.filter((category) =>
        productCategories.includes(category)
    ).length;

    return length;
}


console.log(getPromotion([120]));