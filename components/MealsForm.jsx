
import { useState } from "react"
import React from "react";
//accepts onformsubmit prop for returning user selection
export default function MealsForm({onFormSubmit}) {
    const [category,setCategory] = useState('');

    //handle submit by passing selection back to meal
    const handleMealSelection = (e) => {
        e.preventDefault();
        onFormSubmit(category);
    }
    //returns form for selecting options for meals
    return (
        <div className="Meal">
            <h2>Select category for your auto-generated meal</h2><br />
            <form onSubmit={handleMealSelection}>
                <input 
                    type="radio" 
                    id="Breakfast" 
                    name="Breakfast" 
                    value='Breakfast' 
                    checked={category === 'Breakfast'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Breakfast"> Breakfast </label>
                <input 
                    type="radio" 
                    id="Chicken" 
                    name="Chicken" 
                    value='Chicken' 
                    checked={category === 'Chicken'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Chicken">Chicken </label>
                <input 
                    type="radio" 
                    id="Beef" 
                    name="Beef" 
                    value='Beef' 
                    checked={category === 'Beef'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Beef"> Beef </label>
                <input 
                    type="radio" 
                    id="Pork" 
                    name="Pork" 
                    value='Pork' 
                    checked={category === 'Pork'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Pork"> Pork </label>
                <input 
                    type="radio" 
                    id="Seafood" 
                    name="Seafood" 
                    value='Seafood' 
                    checked={category === 'Seafood'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Seafood"> Seafood </label>
                <input 
                    type="radio" 
                    id="Pasta" 
                    name="Pasta" 
                    value='Pasta' 
                    checked={category === 'Pasta'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Pasta"> Pasta </label>
                <input 
                    type="radio" 
                    id="Vegetarian" 
                    name="Vegetarian" 
                    value='Vegetarian' 
                    checked={category === 'Vegetarian'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Vegetarian"> Vegetarian </label>
                <input 
                    type="radio" 
                    id="Vegan" 
                    name="Vegan" 
                    value='Vegan' 
                    checked={category === 'Vegan'}
                    onChange={(e)=> setCategory(e.target.value)} />
                <label htmlFor="Vegan"> Vegan </label>
                <button className="button">Generate your Meal</button>
            </form>
        </div>
    )
}