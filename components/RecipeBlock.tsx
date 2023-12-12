import {Recipe} from "@/models/Recipe";
import { Image } from 'react-datocms';
import Link from 'next/link'

interface RecipeProps {
    recipe: Recipe
}
export default function RecipeBlock({ recipe }: RecipeProps) {
    return (
        <Link href={`/recipe/${recipe.id}`}>
            <div className="recipe_block">
                <Image data={recipe.mainImage.responsiveImage} />
                <h3>{recipe.title}</h3>
            </div>
        </Link>
    )
}