import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setuserIngredients] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-2339a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-type': 'application/json'}
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setuserIngredients(prevIngredients => [
        ...prevIngredients, 
        {id: responseData.name, ...ingredient}
      ]);
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
