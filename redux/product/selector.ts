import { createSelector } from "@reduxjs/toolkit";

const productSelector = (state) => state.product.data;
const productSalesSelector = (state) => {
    const items = state.sale.items;
    
    const rows = items.map(e => e.productId);

    const products = state.product.data.filter(e => !rows.includes(e.id))

    return products
};

const itemSelector = (state, id) => {
    return state.product.data.find(e => e.id === id);
};

export const productStore = createSelector(productSelector, (product) => product);
export const productForSaleStore = createSelector(productSalesSelector, (product) => product);
export const itemStore = createSelector(itemSelector, (item) => item);