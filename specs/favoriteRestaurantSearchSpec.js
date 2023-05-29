import FavoriteRestaurantSearchPresenter
  from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
    let presenter;

    const searchRestaurants = (query) => {
      const queryElement = document.getElementById('query');
      queryElement.value = query;
      queryElement.dispatchEvent(new Event('change'));
    };
  
    const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
        <div id="restaurant-search-container">
            <input id="query" type="text">
            <div class="restaurant-result-container">
                <ul class="restaurants">
                </ul>
            </div>
        </div>
        `;
    };

    const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurants');
    presenter = new FavoriteRestaurantSearchPresenter({ 
    favoriteRestaurants: FavoriteRestaurantIdb,
    });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
      });
    
      it('should be able to capture the query typed by the user', () => {
        searchRestaurants('resto a');

    expect(presenter.latestQuery).toEqual('resto a');
  });

  it('should ask the model to search for restaurants', () => {
    searchRestaurants('resto a');

    expect(FavoriteRestaurantIdb.searchRestaurants)
      .toHaveBeenCalledWith('resto a');
  });

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(1);

    presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(2);
  });

  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
      .toEqual('Satu');
  });

  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
      .toEqual('Satu');

    presenter._showFoundRestaurants(
      [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }],
    );

    const restaurantTitles = document.querySelectorAll('.restaurant__title');
    expect(restaurantTitles.item(0).textContent).toEqual('Satu');
    expect(restaurantTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found restaurant without title', () => {
    presenter._showFoundRestaurants([{ id: 1 }]);

    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
      .toEqual('-');
  });

  
  it('should show the movies found by Favorite Movies', (done) => {
    document.getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        done();
      });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('film a').and.returnValues([
      { id: 111, name: 'film abc' },
      { id: 222, name: 'ada juga film abcde' },
      { id: 333, name: 'ini juga boleh film a' },
    ]);

    searchRestaurants('film a');
  });

  it('should show the name of the movies found by Favorite Movies', (done) => {
    document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('film abc');
      expect(restaurantTitles.item(1).textContent).toEqual('ada juga film abcde');
      expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh film a');

      done();
    });

    FavoriteRestaurantIdb.searchRestaurants.withArgs('film a').and.returnValues([
      { id: 111, name: 'film abc' },
      { id: 222, name: 'ada juga film abcde' },
      { id: 333, name: 'ini juga boleh film a' },
    ]);

    searchRestaurants('film a');
  });
});