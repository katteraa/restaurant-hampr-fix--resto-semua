import RestaurantSource from '../../data/restaurant-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="hero">  
    <div>
    <img src="hero-image_4.jpg" alt="hero-restaurant" />
    </div>
    </div>

    <section class="content">
    <h1>Explore Restaurant</h1>
    <h3>lets pick!</h3>
    <div id="list-resto" class="list-resto">
    </div>
  </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.getResto();
    const restaurantsContainer = document.querySelector('#list-resto');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestoItemTemplate(restaurant);

    // TODO: tampilkan movies di dalam DOM
    });
  },
};

export default Home;
