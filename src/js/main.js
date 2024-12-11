import { filterItems } from './utils/filterUtils.js';
import { createItemCard, listItems, listCartItems } from './utils/domUtils.js';
import { addToCart, trashCartItem, calculateTotalPrice } from './utils/cartManager.js';

class Locadora {
    constructor(gamesData, consolesData) {
        this.games = gamesData;
        this.consoles = consolesData;
        this.cartItems = [];
        this.totalPriceCartItems = 0.00;

        this.initializeUI();
    }

    initializeUI() {
        this.listItems(this.games, ".games");
        this.listItems(this.consoles, ".consoles");
        this.listCartItems();
        document.getElementById("hoursToHire").addEventListener('input', () => this.updateTotalPriceCartItems());
    }

    listItems(items, sectionSelector, filter = 'all') {
        const filteredItems = filterItems(items, filter);
        listItems(filteredItems, sectionSelector);
    }

    addToCart(id, nome) {
        const item = this.findItemById(id, nome);
        if (item && item.estaDisponivel) {
            this.cartItems = addToCart(this.cartItems, item);
            this.updateTotalPriceCartItems();
            this.listCartItems();
        } else {
            alert("Este item está indisponível!");
        }
    }

    openCartItems() {
        const cartItems = document.getElementById('cartPopUp');
        cartItems.showModal(); 
        cartItems.classList.add('show');  
    }

    closeCartItems() {
        const cartItems = document.getElementById('cartPopUp');
        cartItems.close(); 
        cartItems.classList.remove('show');  
        cartItems.classList.add('hide');
        setTimeout(() => cartItems.classList.remove('hide'), 500);
    }

    findItemById(id, nome) {
        return this.games.find(game => game.id === id && game.nome === nome) ||
               this.consoles.find(console => console.id === id && console.nome === nome);
    }

    trashCartItem(id) {
        this.cartItems = trashCartItem(this.cartItems, id);
        this.updateTotalPriceCartItems();
        this.listCartItems();
    }

    updateTotalPriceCartItems() {
        const hoursToHire = document.getElementById("hoursToHire").value;
        this.totalPriceCartItems = calculateTotalPrice(this.cartItems, hoursToHire);
        document.getElementById("totalPriceCartItems").innerText = `Total: R$ ${this.totalPriceCartItems.toFixed(2)}`;
    }

    listCartItems() {
        listCartItems(this.cartItems);
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

async function initializeData() {
    const gamesData = await fetchData('./src/js/data/jogos.json');
    const consolesData = await fetchData('./src/js/data/consoles.json');
    return { gamesData, consolesData };
}

document.addEventListener("DOMContentLoaded", async () => {
    const { gamesData, consolesData } = await initializeData();
    window.locadora = new Locadora(gamesData, consolesData);
});