import { ToLeones } from "../../hooks";

export const percentage = 100

export const ItemsCount = (items) => {
    return <p>{items.length}</p>
}

export const Cost = (row) => {
    const cost = row.sales === "Wholesale" ? row.wholesaleCost : row.retailCost;
    return ToLeones(cost)
}


export const Discount = (row) => {
    return <p>{row.discount}%</p>
}

export const AmountDiscount = (val) => {
    if (val)
        return <p>{val}%</p>
    else
        return <p>{val}</p>
}

export const Total = (row) => {
    const cost = row.sales === "Wholesale" ? row.wholesaleCost : row.retailCost;
    const total = cost * row.quantity;
    const discount = total * row.discount / percentage;
    const amount = total - discount;

    return ToLeones(amount);
}

export const Footer = (rows, discount) => {
    let totalAmount = 0;

    rows.forEach(row => {
        const cost = row.sales === "Wholesale" ? row.wholesaleCost : row.retailCost;
        const total = cost * row.quantity;
        const discount = total * row.discount / percentage;
        const amount = total - discount;

        totalAmount += amount;
    })

    const amount = totalAmount * (discount / 100)

    return `Total cost for sales: ${ToLeones(totalAmount - amount)}`;
}