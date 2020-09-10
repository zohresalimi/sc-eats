import React from 'react'
import MenuItem from './MenuItem'
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf,faSeedling,faDrumstickBite } from '@fortawesome/free-solid-svg-icons'


const Actions = (props) => {
    const { activePriceLevel ,setActivePriceLevel } = props
    const { selectedCategory ,setSelectedCategory } = props

    const handeGeneralSorting = (restaurants, sortBy) => {
        const { setRestaurants } = props;   
        const sortedRestaurants = [...restaurants].sort((a,b) => {
            if(sortBy === 'maxDeliveryTime'){
                return a[sortBy] - b[sortBy]
            }
            return b[sortBy] - a[sortBy]
        })
        setRestaurants(sortedRestaurants)
    }
    
    /**
     * It is to toggle price button active/inactive state
     * and then calls `setPriceLevel` from parent component
     */
    
    const togglePrice = (event) =>{
        const dataAttribut = parseInt(event.target.getAttribute('data-price'))
        
        if(activePriceLevel.includes(dataAttribut)){
            setActivePriceLevel(activePriceLevel.filter((item) => item !== dataAttribut))
            return
        }
        const newPriceLevel = [...activePriceLevel, dataAttribut]
        setActivePriceLevel(newPriceLevel)
    }

    // filter by food category
    const filterByCategory = (event) =>{
        const category = event.target.value
        console.log(event.target.checked)
        console.log(category)
        if (selectedCategory.includes(category)) {
            setSelectedCategory(selectedCategory.filter(item => item !==category))
            return
        } 
        const categoryList = [...selectedCategory, category]
        setSelectedCategory(categoryList)
        console.log(categoryList)
    }


    return (
        <div className="actions">
            <MenuItem title="sort">
                <div>
                    <label>Most popular <input
                        value="popularity"
                        type="radio"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    />
                    </label>
                    <label>Rating <input
                        value="rating"
                        type="radio"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    /></label>
                    <label>Delivery time <input
                        value="maxDeliveryTime"
                        type="radio"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    /></label>
                </div>
            </MenuItem>
            {/* TODO */}
            {/* <!-- Implement as assignment for Thursday --> */}
            <MenuItem title="Price Range">
                <div className="button-group wide-container">
                    {
                        [1, 2, 3, 4].map((item) => {
                            return (
                                <span key={item} data-price={item} className={activePriceLevel.includes(item) ? "active" : "inactive"} onClick={togglePrice}>{"$".repeat(item)}</span>
                            )
                        })
                    }
                </div>
            </MenuItem>
            
            <MenuItem title="Dietary choice">
                <div>
                    <label>Vegetarian
                        <FontAwesomeIcon className="icon" icon={faLeaf}/>
                        <input
                            value="vegetarian"
                            type="checkbox"
                            name="Vegetarian"
                            onChange={event => filterByCategory(event)}
                        />
                    </label>
                    <label>Vegan 
                        <FontAwesomeIcon className="icon" icon={faSeedling} />
                        <input
                            value="vegan"
                            type="checkbox"
                            name="Vegan"
                            onChange={event => filterByCategory(event)}
                        />
                    </label>
                    <label>None-vegan
                        <FontAwesomeIcon className="icon" icon={faDrumstickBite} />
                        <input
                            value="non vegan"
                            type="checkbox"
                            name="None-vegan"
                            onChange={event => filterByCategory(event)}
                        />
                    </label>
                </div>
                
            </MenuItem>
        </div>
    )


}
export default Actions;