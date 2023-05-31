import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
 
let favoriteRestaurants = [];
 
const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }
 
    return favoriteRestaurants.find((restaurant) => restaurant.id == id);
  },
 
  getAllRestaurants() {
    return favoriteRestaurants;
  },
 
  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
 
    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getRestaurant(restaurant.id)) {
      return;
    }
 
    favoriteRestaurants.push(restaurant);
  },
 
  deleteRestaurant(id) {
    // cara boros menghapus resto dengan meng-copy resto yang ada
    // kecuali resto dengan id == id
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
  },


  
  searchRestaurants(query) {
    return this.getAllRestaurants()
      .filter((restaurant) => {
        const loweredCaseRestaurantTitle = (restaurant.name || '-').toLowerCase();
        const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
      });
  },
};
 

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurants = []);
 
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});