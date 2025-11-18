import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import { productCard } from "./components/productCard.js";
import { skeletonCard } from "./components/skeletonCard.js";
import { getLocalProducts } from "./services/productService.js";
import { getRecommendations } from "./services/recommendService.js";
import { saveCart, loadCart } from "./utils/storage.js";
let cart = loadCart();
function updateCartBadge() {
    document.getElementById("cart_badge").textContent = cart.length;
}
async function loadProducts() {
    const cont = document.getElementById("product_list");
    cont.innerHTML = skeletonCard().repeat(4);
    try {
        const data = await getLocalProducts();
        cont.innerHTML = data.map(productCard).join("");
    } catch {
        cont.innerHTML = `<div class="alert alert-danger">❌ Producten konden
niet geladen worden</div>`;
    }
}
async function loadRecommendations() {
    const cont = document.getElementById("rec_list");
    cont.innerHTML = skeletonCard().repeat(3);
    try {
        const rec = await getRecommendations();

        cont.innerHTML = rec.slice(0,3)
            .map(r => productCard({name: r.show.name, price: 0}, 0))
            .join("");
    } catch {
        cont.innerHTML = `<div class="alert alert-warning">⚠️ Aanraders niet
beschikbaar</div>`;
    }
}



document.addEventListener("DOMContentLoaded", async () => {
    updateCartBadge(); //toont aantal producten die in de cart zitten
    await loadProducts();
    await loadRecommendations();
    document.body.addEventListener("click", e => {
        if (e.target.classList.contains("add_cart_btn")) {
            const idx = e.target.dataset.idx;
            cart.push(idx);
            saveCart(cart);
            updateCartBadge();
        }
    });
})