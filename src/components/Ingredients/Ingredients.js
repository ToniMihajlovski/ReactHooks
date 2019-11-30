import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setuserIngredients] = useState([]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setuserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-2339a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setuserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    })
  }
  
  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-2339a.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
    .then(response => {
      setuserIngredients(prevIngredients => 
        prevIngredients.filter(ingredient => ingredient.Id !== ingredientId))
    });
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
