
export const fetchProducts = (API_PRODUCTOS) => {

  return fetch(API_PRODUCTOS) // Realizamos la petición GET a la API
    .then((res) => res.json()) // Convertimos la respuesta en formato JSON
    .then((json) => json.reverse()) // Procesamos los datos según sea necesario
    .catch((err) => {
      console.error('Error al obtener los productos:', err); // Manejamos errores en caso de fallo
      throw err; // Lanza el error para que lo pueda manejar otro módulo si es necesario
    });
};
