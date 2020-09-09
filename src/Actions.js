import React, { useState, useEffect } from 'react'
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Actions = (props) => {
    const [showPriceItem, setPriceItem] = useState(false)
    const [showDietaryItem, setDietarytem] = useState(false)
    const [showSortSelector, setSortSelector] = useState(false);

    const { setActivePriceLevel, activePriceLevel } = props

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


    return (
        <div className="actions">
            <span className="button-group">
                <button onClick={() => setSortSelector(!showSortSelector)}><span>Sort</span> <FontAwesomeIcon icon={"chevron-down"} /></button>
                {showSortSelector && <div>
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
                </div>}
            </span>
            {/* TODO */}
            {/* <!-- Implement as assignment for Thursday --> */}
            <span className="button-group">
                <button onClick={() => setPriceItem(!showPriceItem)}><span>Price Range</span> <FontAwesomeIcon icon={"chevron-down"} /></button>
                {showPriceItem && <div className="button-group wide-container">
                    {
                        [1, 2, 3, 4].map((item) => {
                            return (
                                <span key={item} data-price={item} className={activePriceLevel.includes(item) ? "active" : "inactive"} onClick={togglePrice}>{"$".repeat(item)}</span>
                            )
                        })
                    }
                </div>}
            </span>
            <span className="button-group">
                <button onClick={() => setDietarytem(!showDietaryItem)}><span>Dietary choice</span> <FontAwesomeIcon icon={"chevron-down"} /></button>
                {showDietaryItem && <div>
                    <label>Vegetarian <input
                        value="popularity"
                        type="checkbox"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    />
                    </label>
                    <label>Vegan <input
                        value="rating"
                        type="checkbox"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    /></label>
                    <label>None-vegan <input
                        value="maxDeliveryTime"
                        type="checkbox"
                        name="generalSort"
                        onChange={event => handeGeneralSorting(props.restaurants, event.currentTarget.value)}
                    /></label>
                </div>}
            </span>
        </div>
    )


}
export default Actions;