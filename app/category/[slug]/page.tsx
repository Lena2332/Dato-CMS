import { performRequest } from '@/lib/datocms';
import { Image } from 'react-datocms';
import { StructuredText } from "react-datocms";
import RecipeBlock from "@/components/RecipeBlock";
import {Recipe} from "@/models/Recipe";


export default async function Category({ params }: { params: { slug: string } }) {
    const CAT_QUERY = `
            query Category {
              category(filter: {slug: {eq: ` + params.slug + `}}) {
                id
                title(locale: en)
                description(locale: en) {
                 blocks
                 links
                 value
                }
              image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 250, h: 250 }) {
                    alt
                    aspectRatio
                    base64
                    bgColor
                    height
                    sizes
                    src
                    srcSet
                    title
                    webpSrcSet
                    width
                  }
              }
          }
        }
    `;

    const { data: { category } } = await performRequest({ query: CAT_QUERY });

    const RECIPES_QUERY = `
            query AllRecipes {
              allRecipes(filter: {categories: {eq: "` + category.id + `"}}, locale: en) {
                created
                id
                title(locale: en)
                description(locale: en) {
                  blocks {
                    id
                    image {
                      responsiveImage {
                        alt
                        aspectRatio
                        base64
                        bgColor
                        height
                        sizes
                        src
                        srcSet
                        title
                        webpSrcSet
                        width
                      }
                    }
                  }
                  links
                  value
                }
                mainImage {
                  responsiveImage {
                    alt
                    aspectRatio
                    base64
                    bgColor
                    height
                    sizes
                    src
                    srcSet
                    title
                    webpSrcSet
                    width
                  }
                }
                steps {
                  descr(markdown: false)
                  id
                  photo {
                    responsiveImage {
                      alt
                      aspectRatio
                      base64
                      bgColor
                      height
                      sizes
                      src
                      srcSet
                      title
                      webpSrcSet
                      width
                    }
                  }
                  title
                }
              }
            }
    `;

    //console.log(await performRequest({ query: RECIPES_QUERY }));
    const { data: { allRecipes } } = await performRequest({ query: RECIPES_QUERY });

    return(
        <>
            <div className="content category">
                <div className="category">
                    <div className="category_content">
                        <Image data={category.image.responsiveImage} />
                        <div className="category_text">
                            <h1>{category.title} </h1>
                            <StructuredText data={category.description} />
                        </div>
                    </div>
                    <h1>All recipes: </h1>
                    <div className="recipes_blocks">
                        { allRecipes ? allRecipes.map((recipe: Recipe) => <RecipeBlock recipe={recipe} key={ recipe.id }/>) : "" }
                    </div>
                </div>
            </div>
        </>
    )

}