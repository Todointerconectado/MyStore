// Función para agregar productos al carrito
export const agregarAlCarrito = (producto) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find(item => item.id === producto.id);

  if (productoExistente) {
    // Incrementar la cantidad del producto existente
    productoExistente.cantidad += 1;
  } 
  else {
    // Agregar el nuevo producto con cantidad inicial de 1
    producto.cantidad = 1;
    carrito.push(producto);
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  Swal.fire({
    imageUrl: producto.image,
    title: producto.title,
    text: "¡Producto agregado al carrito!",
    icon: "success",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: producto.title,
  });
};

// Función para inicializar eventos de los botones "Agregar al carrito"
export const inicializarEventosCarrito = () => {
  const botones = document.querySelectorAll('.card-btn');
  botones.forEach((boton) => {
    boton.addEventListener('click', (event) => {
      const cardElement = event.target.closest('.card');
      const producto = {
        id: cardElement.dataset.id,
        title: cardElement.querySelector('.card__name').textContent,
        price: parseFloat(
          cardElement.querySelector('.card__price-new').textContent.replace('$', '')
        ),
        image: cardElement.querySelector('.card__img').src,
      };
      agregarAlCarrito(producto);
      crearItemCarrito(); // Actualizar la tabla del carrito después de agregar
    });
  });
};

// Función para crear y mostrar los ítems del carrito en la tabla
export const crearItemCarrito = () => {
  const carritoItemsStorage = JSON.parse(localStorage.getItem('carrito')) || [];
  const $carritoTableBody = document.querySelector("#carritoTableBody");
  const $totalGeneral = document.querySelector("#total");
  let total = 0;

  // Limpiar la tabla antes de renderizar
  $carritoTableBody.innerHTML = "";

  carritoItemsStorage.forEach(item => {
    const tr_Row = document.createElement('tr');

    // Columna: Imagen y Categoría
    const td_image = document.createElement('td');
    const figure = document.createElement('figure'); // Contenedor para la imagen y la categoría

    // Imagen
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title; // Manteniendo el alt como el título
    img.width = 100; // Ajusta el tamaño según sea necesario
    img.style.borderRadius = '5px'; // Estilo opcional
    figure.appendChild(img);

    // Categoría
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = item.title;
    figure.appendChild(figcaption);

    // Agregar el contenedor a la celda
    td_image.appendChild(figure);

    // Agregar la celda a la fila
    tr_Row.appendChild(td_image);

    // Columna: Precio
    const td_price = document.createElement('td');
    td_price.textContent = `$${item.price.toFixed(2)}`;
    tr_Row.appendChild(td_price);

    // Columna: Cantidad
    const td_cantidad = document.createElement('td');
    td_cantidad.textContent = item.cantidad;
    tr_Row.appendChild(td_cantidad);

    // Columna: Subtotal (precio * cantidad)
    const subTotal = item.price * item.cantidad;
    const td_subTotal = document.createElement('td');
    td_subTotal.textContent = `$${subTotal.toFixed(2)}`;
    tr_Row.appendChild(td_subTotal);

    // Agregar la fila a la tabla
    $carritoTableBody.appendChild(tr_Row);

    // Sumar al total general
    total += subTotal;
  });

  // Actualizar el total general
  $totalGeneral.textContent = `$${total.toFixed(2)}`;

  // botón para limpiar el carrito y volver al inicio
  document.querySelector("#finalizar-compra").addEventListener('click', () => {
  
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 20000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "COMPRA CARRITO FINALIZADA!"
    });

    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
  });

  // botón para limpiar el carrito y volver al inicio
  document.querySelector("#limpiar-carrito").addEventListener('click', () => {
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
  });
};
