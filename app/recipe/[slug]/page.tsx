import { performRequest } from '@/lib/datocms';
import { Image } from 'react-datocms';
import { StructuredText } from "react-datocms";
import Step from "@/components/Step";
import {StepI} from "@/models/Step";
import { datocmsimporttest } from '@/lib/datocmsimporttest'

export default async function Recipe({ params }: { params: { slug: string } }) {
    const RECIPE_QUERY = `
         query MyQuery {
          recipe(filter: {id: {eq: "` + params.slug + `"}}) {
            id
            description(locale: en) {
              blocks{
                __typename
                ... on ImageBlockRecord {
                  id
                  image { url alt }
                }
              }
              value
            }
            mainImage {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 250, h: 250, auto: format }) {
                alt
                aspectRatio
                base64
                bgColor
                height
                src
                srcSet
                title
                webpSrcSet
                width
              }
            }
            steps {
              descr
              id
              photo {
                responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 200, h: 200 }) {
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
            tags {
              id
              slug
              title
            }
            title(locale: en)
          }
        }
    `;



    const { data: { recipe } } = await performRequest({ query: RECIPE_QUERY });
    await datocmsimporttest();
    return (
        <div className="content">
            <div className="recipe_content">
                <div className="recipe_img">
                    <Image data={recipe.mainImage.responsiveImage} />
                </div>
                <div className="recipe_text">
                    <h1>{recipe.title}</h1>
                    <div>
                        <StructuredText data={recipe.description}
                            renderBlock={({ record }) => {
                                switch (record.__typename) {
                                    case "ImageBlockRecord":
                                        return <img src={record.image.url} alt={record.image.alt} className="recipe_descr_img"/>;
                                    default:
                                        return null;
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <h1>STEPS:</h1>
            <div className="step_block">
                { recipe.steps ? recipe.steps.map((step: StepI) => <Step step={step} key={step.id}/>) : "" }
            </div>
        </div>
    )
}