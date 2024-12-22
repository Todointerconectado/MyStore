import { skeleton } from './modules/skeleton-img.mjs';
import { fetchProducts } from './modules/api.mjs';
import { createCard } from './modules/cards.mjs';

document.addEventListener('DOMContentLoaded', () => {
  skeleton();
});

const $CONTAINER_CARDS = document.querySelector('#container_cards');

fetchProducts()
  .then(json => {
    json.forEach(producto => {
      const cardHTML = createCard(producto);
      $CONTAINER_CARDS.innerHTML += cardHTML;
    });
  })
  .catch(err => {
    console.error('Error al obtener los productos:', err);
    $CONTAINER_CARDS.innerHTML = '<p>Hubo un problema al cargar los productos. Por favor, inténtalo más tarde.</p>';
  });
