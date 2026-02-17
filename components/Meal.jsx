
import { useState, useEffect } from "react";
import React from "react";
import MealCard from "./MealsCard";
import MealsForm from "./MealsForm";


//async function for getting a list of meals by categories
async function getMeal(category){
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if(!res.ok){
        throw new Error('Failed to fetch category');
    }else{
        return res.json()
    }
}
//async function for getting ingredients for a selected meal by passing meal id
async function getIngredients(id){
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if(!res.ok){
        throw new Error('Failed to fetch Ingredients');
    }else{
        return res.json()
    }
}
export default function Meal(){
    const [meals, setMeals] = useState([]);
    const [meal, setMeal] = useState(null);
    const [category, setCategory] = useState('Vegan');
    


   //useEffect hook for fetching meals from the promise with category as a parameter and the category user selection as a dependency
    useEffect(()=> {
        async function fetchMeals(){
         try{//calls getMeal function and store response in the meals array
            const mealsData = await getMeal(category);
            setMeals(mealsData.meals);
         } catch(error) {
            console.error(error);
         }  
        }
        fetchMeals();  
        
    },[category]);
    // useEffect hook for fectching ingredients from the promise using the meals array as a dependency and the meal id as a prop.
    useEffect(()=> {
        async function fetchIngredients(){
            if(meals.length > 0 ){
                for (let i = meals.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [meals[i], meals[j]] = [meals[j], meals[i]];
                }
            }
         try{//calls getingredients function and stores in single meal variable
            const fullMeal = await getIngredients(meals[0].idMeal);
            setMeal(fullMeal.meals[0]);
         } catch(error) {
            console.error(error);
         }  
        }
        fetchIngredients();  
        
    },[meals]);
//handle the form submit and stores the category in a local state variable to allow use by useeffect
const handleFormSubmit=(selectedCategory) => {
    setCategory(selectedCategory);
    }

    return (
        <div>
            {/* passed onformsubmit to meals form to recieve user selections */}
            <div className="forms">
                <MealsForm onFormSubmit={handleFormSubmit}/>
            </div>
            {/* passing the selected meal to mealcard to be styled */}
              <div className="meal">
                 {meal && (    <MealCard 
                    name={meal.strMeal}
                    id={meal.strInstructions}
                    image={meal.strMealThumb}
                /> 
                 )}
            </div>     
        </div>
    )
}