export function createItemCard(item, itemType) {
    const newItemCard = document.createElement('div');
    newItemCard.classList.add(itemType);
    newItemCard.innerHTML = `
        <img src="${item.img}" class="${itemType}-img">
        <h1 class="${itemType}-title">${item.nome}</h1>
        <p class="${itemType}-price">R$ ${item.valorHora.toFixed(2)} p/hr</p>
        <p class="${itemType}-status ${item.estaDisponivel ? 'disponivel' : 'indisponivel'}">
            <span></span>${item.estaDisponivel ? 'Disponível' : 'Indisponível'}
        </p>
        <a class="btn-alugar btn-${itemType}" onclick="locadora.addToCart(${item.id}, '${item.nome}')">
            <i class="fas fa-cart-shopping"></i>
        </a>
    `;
    return newItemCard;
}

export function listItems(items, sectionSelector, filter = 'all') {
    const section = document.querySelector(sectionSelector);
    section.innerHTML = '';
    items.forEach(item => {
        const itemCard = createItemCard(item, sectionSelector.slice(1, -1));
        section.appendChild(itemCard);
    });
}

export function listCartItems(cartItems) {
    const cartItemsContainer = document.querySelector(".cartItems");
    cartItemsContainer.innerHTML = cartItems.length === 0
        ? '<p class="noItemsInCart">Nenhum Item no Carrinho!</p>'
        : cartItems.map(item => `
            <div class="cartItem">
                <div class="cartInfo">
                    <img src="${item.img}" alt="">
                    <div class="info">
                        <h1 class="titleItem">${item.nome}</h1>
                        <p class="valueItem">R$ ${item.valorHora.toFixed(2)} p/hr</p>
                    </div>
                </div>
                <div class="removeCartItem">
                    <i class="fas fa-times" onclick="locadora.trashCartItem(${item.id})"></i>
                </div>
            </div>
        `).join('');
    document.getElementById("cartItensCount").innerText = cartItems.length;
}