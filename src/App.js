import {useEffect, useState} from "react";
import React from "react"
import './App.css';
import Recipe from './recipe.js'
import classNames from 'classnames/bind'
import credentials from './credentials.json'


function App() {
  const app_key = credentials.APP_KEY;
  const app_id = credentials.APP_ID;

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  const [placeHolder, setPlaceHolder] = useState('Search Query')
  
  const styles = {
    success: 'success',
    error: 'error',
    warning: 'warning'
  };

  let cx = classNames.bind(styles);

  let className = cx({
    messagebox: false,
    success: query ? true : false,
    error: query ? false : true,
    warning: false,
  });



   async function getRecipe() {
     if(query === ''){
      setPlaceHolder("Please insert a search query")
      
      className = cx({
        messagebox: false,
        success: false,
        error: true,
        warning: false
      })

      return
     }

     setPlaceHolder("Search Query")

      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`)
      const data = await response.json();
  
      setRecipes(data.hits)
    }

  useEffect(() => {

    getRecipe()
  }, [query])

  const updateSearch = e => {
    if(e.target.value !== ''){
      className = cx({
        messagebox: false,
        success: true,
        error: false,
        warning: false,
      });
    }
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }



  return (
    
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className={className} type="text" value={search} onChange={updateSearch} placeholder={placeHolder}></input>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={Math.round(recipe.recipe.calories)} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}></Recipe>
      ))}        
      </div>

    </div>
  );
}

export default App;
