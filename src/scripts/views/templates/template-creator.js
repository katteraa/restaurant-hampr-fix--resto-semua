import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
<div class="detail>

 <div  class="resto__title"> <h2>
  ${resto.name}
  </h2></div>
  <img  class="resto__poster"  src="${resto.pictureId ? CONFIG.BASE_IMAGE_URL + resto.pictureId : 'images/heros/hero-image_2.jpg'}" crossorigin="anonymous" />
  
  <div class="resto__info">
     <ul>
        <li>
          <h3>Kota</h3>
          <p>${resto.city}</p>
        </li>
        <li>
          <h3>Alamat</h3>
          <p>${resto.address}</p>
        </li>
        <li>
          <h3>Rating</h3>
          <p>${resto.rating}</p>
        </li>
        <li>
          <h3>Foods Menu</h3>
          <span id="food">
          <p>${resto.menus.foods.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
        <li>
          <h3>Drinks Menu</h3>
          <span id="drink">
            <p>${resto.menus.drinks.map((food) => food.name).join(', ')}</p>
          </span>
        </li>
        
        <li>
        <h3>Ulasan Pelanggan</h3>
       <p> ${resto.customerReviews.map(
    (review) => `
              <div class="detail-review-item">
                <div class="review-header">
                  <p class="review-name">${review.name}</p>
    
                  <p class="review-date">${review.date}</p>
                </div>
    
                <div class="review-body">
                  ${review.review}
                </div>
              </div>
            `,
  )
    .join('')}</p>
        </li>
      </ul>
    </div>

  
    <div>
      <h2>Overview</h2>
      <p>${resto.description}</p>
    </div>

  </div>
`;

const createRestoItemTemplate = (resto) => `
<div class="resto-item">
<div class="resto-item__header">
    <img class="resto-item__header__poster" alt="${resto.name || '-'}"
    src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}" alt="${resto.name}" crossorigin="anonymous"/>
    <div class="resto-item__header__rating">
        <p>⭐️<span class="resto-item__header__rating__score">${resto.rating || '-'}</span></p>
    </div>
</div>
<div class="resto-item__content">
    <h3 class="resto__title"><a href="${`/#/detail/${resto.id}`}">${resto.name || '-'}</a></h3>
    <p>${resto.description || '-'}</p>
</div>
</div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
