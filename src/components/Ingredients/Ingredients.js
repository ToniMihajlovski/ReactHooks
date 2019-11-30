import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setuserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setuserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-2339a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      setuserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ]);
    })
  }

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-hooks-2339a.firebaseio.com/ingredients/${ingredientId}.jso`, {
      method: 'DELETE',
    }
    ).then(response => {
      setIsLoading(false);
      setuserIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.Id !== ingredientId))
    }).catch(error => {
      setError(error.message);
      setIsLoading(false);
    })
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
