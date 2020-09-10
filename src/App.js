import './App.css';
import React, { useState } from 'react';
import Actions from './Actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import data from './data.json'

library.add(faChevronDown)

const RESTAURANTS_PRICE_LEVEL = {
  1: [0, 50],
  2: [51, 100],
  3: [101, 150],
  4: [151, 200]
}


function App() {
  const [restaurants, setRestaurants] = useState([])
  const [activePriceLevel, setActivePriceLevel] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])

  
  // Explore effect! (for classfull, this was related to componentWillMount, componentDidMount side effects) )
  React.useEffect(() => {
    setRestaurants(data.restarants);
  }, [])

  const [restuarantName, setName] = useState('');

  const filterByPriceLevel = (restaurant) =>{
    if(!activePriceLevel.length) return restaurant
    
    const { menu } = restaurant
    const menuItems = [].concat(...menu.map(category => category.items))
    const averagePrice =  menuItems.reduce((sum, item, index, items) => {
        if(index === items.length - 1){
            sum += item.price
            return sum / items.length
        }
        return sum + item.price
    }, 0)
    
    let isInRange = false;
    activePriceLevel.forEach(priceLevel => {
      const [minPrice, maxPrice] = RESTAURANTS_PRICE_LEVEL[priceLevel]
      if(averagePrice <= maxPrice && averagePrice >= minPrice) {
        isInRange = true
        return
      }
    })

    if(isInRange){
      return restaurant
    }
  }

  const getMenuDiatryList = (restaurant) => { 
    const { menu } = restaurant
    const menuItems = [].concat(...menu.map(category => category.items))
    
    const categories = menuItems.map(item => item.typeOfMeal)
    return Array.from(new Set(categories))
  }

  const filterByCategory = (restaurant) => {
    if(!selectedCategory.length) return restaurant
    const { menu } = restaurant
    const menuItems = [].concat(...menu.map(category => category.items))
    let isExist = false;
    menuItems.forEach((item) => {
      console.log('item:' + item.typeOfMeal)
      console.log('selectedCategory:' + selectedCategory)
      if(selectedCategory.includes(item.typeOfMeal)){
        isExist= true
      }
    })
    if(isExist){
      return restaurant
    }

  }

  const filteredRestaurant = restaurants.filter(filterByPriceLevel).filter(filterByCategory)


  return (
    <div className="App">
      <header>
        <nav>
          <a href="/">SC<span style={{ color: "#06c167" }}>eats</span></a>
        </nav>
        <Actions
          setRestaurants={setRestaurants}
          restaurants={restaurants}
          setActivePriceLevel={setActivePriceLevel}
          activePriceLevel={activePriceLevel}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <form className="searchFood" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Search for food" value={restuarantName} onBlur={e => setName(e.target.value)} onChange={e => setName(e.target.value)} />
          <button onClick={() => { 
            // TODO - future implementation
          }}>Search</button>
        </form>
      </header>
      <div className='restaurants'>
        {filteredRestaurant.length ? filteredRestaurant.map(restaurant => {
          return(
            <section key={restaurant.id}>
              <div className='info'>
                <p>{getMenuDiatryList(restaurant).join(' or ')}</p>
                <p>Rating: {restaurant.rating}</p>
                <p>{restaurant.popularity}</p>
                <p>Time: {restaurant.maxDeliveryTime} min</p>
              </div>
              <img src={restaurant.img} alt="" />
              <h2>{restaurant.name}</h2>
              <p className="description">{restaurant.description}</p>
            </section>
          )
        }) : 'Could not find restaurants in this price level'}
      </div>
    </div>
  );
}

export default App;
