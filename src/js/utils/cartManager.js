export function addToCart(cartItems, item) {
    cartItems.push(item);
    return cartItems;
}

export function trashCartItem(cartItems, id) {
    return cartItems.filter(item => item.id !== id);
}

export function calculateTotalPrice(cartItems, hours) {
    return cartItems.reduce((total, item) => total + item.valorHora * hours, 0);
}