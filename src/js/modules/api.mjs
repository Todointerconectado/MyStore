export const fetchProducts = () => {
  const API = `https://fakestoreapi.com/products`;

  return fetch(API)  // Realizamos la petición GET a la API
    .then(res => res.json())  // Convertimos la respuesta en formato JSON
    .then(json => json.reverse())
    .catch(err => {
      console.error('Error al obtener los productos:', err);  // Manejamos errores en caso de fallo
      throw err;  // Lanza el error para que lo pueda manejar otro módulo si es necesario
    });
};
