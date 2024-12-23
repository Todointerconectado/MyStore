
import { skeleton } from './modules/skeleton-img.mjs';
import { createCard } from './modules/cards.mjs';
import { inicializarEventosCarrito } from './modules/carrito.mjs'; // Importamos las funciones del carrito

// Inicializamos el skeleton loader
document.addEventListener('DOMContentLoaded', () => {
  skeleton();
});

const $CONTAINER_CARDS = document.querySelector('#container_cards');
const API_PRODUCTOS = 'https://fakestoreapi.com/products';

// Función para obtener productos desde la API
fetch(API_PRODUCTOS)
  .then((res) => res.json()) // Convertimos la respuesta en formato JSON
  .then((json) => {
    // Procesamos los datos (opcional: invertimos el orden)
    const productos = json.reverse();

    // Renderizamos las tarjetas
    productos.forEach((producto) => {
      const cardHTML = createCard(producto);
      $CONTAINER_CARDS.innerHTML += cardHTML;
    });

    // Inicializamos los eventos después de renderizar las tarjetas
    inicializarEventosCarrito(); // Llamamos a la función para inicializar los eventos del carrito
  })
  .catch((err) => {
    // Manejo de errores
    console.error('Error al obtener los productos:', err);
    $CONTAINER_CARDS.innerHTML =
      '<p>Hubo un problema al cargar los productos. Por favor, inténtalo más tarde.</p>';
  });
