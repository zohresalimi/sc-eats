import React, { useState, useEffect } from 'react'
import MenuItem from './MenuItem'
// read: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Actions = (props) => {
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
            <MenuItem
                title="sort"
            >
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
            <MenuItem
                title="Price Range"
            >
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
            
            <MenuItem 
                title="Dietary choice"
            >
                <div>
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
                </div>
                
            </MenuItem>
        </div>
    )


}
export default Actions;