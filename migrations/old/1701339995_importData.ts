import {buildClient, Client} from '@datocms/cma-client-node';
import { categories } from '@/data/categories';
import { recipes } from "@/data/recipes";
import  uploadImg  from "@/migrations/utils/uploadNewImage"
import {Recipe} from "@/models/Recipe";
import createStructuredText from "@/migrations/utils/createStructuredText";

interface categoryProps {
    slug: string,
    id: string
}
export default async function importData(client: Client): Promise<void> {

    const catID = `Gs8ieCNhT6yTo34PAloR5A`;
    const recipeApiKey = '';

     // Import Categories
    var categoryNameToRecord: categoryProps[] = [];

    for (var cat of categories) {
        //let image = uploadImg(client, cat.image, cat.title.en);
        //console.log(image);
        let item_type = 'category';
        let data = await client.items.create({
            item_type: { type: 'item_type', id: `Gs8ieCNhT6yTo34PAloR5A` },
            title: {
                en: "qqqqq23",
                ru: "ssssss23",
                sv: "qqqqqqsd23"
            },
            slug: 'cattt23',
            // description: {
            //     en: createStructuredText(cat.description.en),
            //     ru: createStructuredText(cat.description.ru),
            //     sv: createStructuredText(cat.description.sv)
            // },
            // image
        });
        // let data = await client.items.create({
        //     item_type: { type: 'item_type', id: catID },
        //     title: cat.title,
        //     slug: cat.slug,
        //     description: {
        //         en: createStructuredText(cat.description.en),
        //         ru: createStructuredText(cat.description.ru),
        //         sv: createStructuredText(cat.description.sv)
        //     },
        //     //image
        // });
        console.log(data);
    }
}