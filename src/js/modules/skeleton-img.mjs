export const skeleton = () => {
    const cardFigure = document.querySelector('.card__figure');
    const cardImg = cardFigure.querySelector('.card__img');

    // Función para controlar la animación
    const toggleAnimacion = (activar) => {
        cardFigure.classList.toggle('card__figure-skeleton-loading', activar);
    };

    // Verifica si la imagen ya está en caché
    if (!cardImg.complete) {
        toggleAnimacion(true); // Inicia la animación si la imagen no está cargada
        
        cardImg.onload = () => toggleAnimacion(false); // Detiene la animación al cargar la imagen
        
        cardImg.onerror = () => {
            toggleAnimacion(false); // Detiene la animación en caso de error
            toggleAnimacion(true);  // Reinicia la animación para indicar que hay un error
        };

    } else {
        toggleAnimacion(false); // Si la imagen ya está cargada, no activa la animación
    }
};
