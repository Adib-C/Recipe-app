import React from 'react';
import style from './recipe.module.css'

const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.Recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <p>Calories: {Math.round(calories)}</p>
            <img src={image} alt="image" className={style.foto}></img>

        </div>
    )
}

export default Recipe;