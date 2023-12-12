import { Client } from '@datocms/cli/lib/cma-client-node';
import { categories } from '../data/categories';
import { recipes } from '../data/recipes';
import { parse } from 'parse5';
import {
    parse5ToStructuredText,
    Options,
} from 'datocms-html-to-structured-text';
import htmlToStructuredText from "./utils/htmlToStructuredText";

export default async function(client: Client): Promise<void> {
  // DatoCMS migration script

  const categoryModel = await client.itemTypes.find('category');
  const recipeModel = await client.itemTypes.find('recipe');
   async function createStructuredText(html: string) {
       const  structuredText = await parse5ToStructuredText(
           parse(html, {
               sourceCodeLocationInfo: true,
           })
       );

       console.log(structuredText);
       return structuredText;
  }
  var st =  htmlToStructuredText("<h1>Hello Cat name 1(ua)!</h1><p>Imported text :)</p>");
  console.log(st);
  const  stc = await htmlToStructuredText("<h1>Hello Cat name 1(ua)!</h1><p>Imported text :)</p>");
  console.log(stc);

  for (let cat of categories) {
      const structuredTextContentEn = await htmlToStructuredText(
          cat.description.en,
      );

      const structuredTextContentSv = await htmlToStructuredText(
          cat.description.sv,
      );

      const structuredTextContentRu = await htmlToStructuredText(
          cat.description.ru,
      );

      const image = await client.uploads.createFromLocalFile({
          // local path of the file to upload
          localPath: cat.image,
          // if you want, you can specify a different base name for the uploaded file
          //filename: 'different-image-name.png',
          // skip the upload and return an existing resource if it's already present in the Media Area:
          skipCreationIfAlreadyExists: true,
          // specify some additional metadata to the upload resource
          author: 'New author!',
          copyright: 'New copyright',
          default_field_metadata: {
              en: {
                  alt: cat.title.en,
                  title: cat.title.en,
                  focal_point: {
                      x: 0.3,
                      y: 0.6,
                  },
                  custom_data: {
                      watermark: true,
                  },
              },
          },
      });

      const category = await client.items.create({
          item_type: categoryModel,
          title: {
            en: cat.title.en,
            sv: cat.title.sv,
            ru: cat.title.ru
          },
          description: {
            en: structuredTextContentEn,
            sv: structuredTextContentSv,
            ru: structuredTextContentRu
         },
         slug: cat.slug,
         image: {
             upload_id: image.id
         }
       });
  }

    const records = await client.items.list({
        filter: {
            type: 'Gs8ieCNhT6yTo34PAloR5A',
            slug: 'fffgf'
        },
        nested: true,
    });

   console.log(records);
}