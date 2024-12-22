export const createCard = (producto) => {
  const { title, price, description, category, image } = producto;

  return `
    <article class="card">
      <figure class="card__figure">
          <img class="card__img" src="${image}" alt="${title}" decoding="async" loading="lazy">
          <img class="card__img card__img2" src="${image}" alt="${title}" decoding="async" loading="lazy">
      </figure>
      <div class="card__gradient"></div>

      <div class="card__content-text">
        <header class="card__header">
          <h2 class="card__name">${title}</h2>
          <div class="card__category">
            <i class="fa-solid fa-tag" aria-hidden="true"></i>
            <span>${category}</span>
          </div>
        </header>
        <section class="card__description">
          <p>${description.slice(0,150)}</p>
        </section>
        <footer class="card__footer">
          <div class="card__pricing">
            <strong class="card__price-new">
              <i class="fa-solid fa-dollar-sign" aria-hidden="true"></i>${price}
            </strong>
            <del class="card__price-old">
              <i class="fa-solid fa-dollar-sign" aria-hidden="true"></i>${(price * 3).toFixed(2)}
            </del>
          </div>
          <button type="button" class="card-btn">
            agregar al
            <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          </button>
        </footer>
      </div>
    </article>
  `;
};
