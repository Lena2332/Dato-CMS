import {SiteClient} from "datocms-client";
import {categories} from "@/data/category";
import { parse } from 'parse5';
import {
    parse5ToStructuredText,
    Options,
} from 'datocms-html-to-structured-text';

export const performClient = async () => {
    const { SiteClient } = require('datocms-client');

    const client = new SiteClient(`3c9434668a2d3c19ffb9c4a942cfeb`);

     let categoryNameToRecord = [];
    const categoriesArr = categories;

    async function createStructuredText(htmlText) {
        const result = await parse5ToStructuredText(
            parse(htmlText, {
                sourceCodeLocationInfo: true,
            })
        );

        return result;
    }

    async function uploadImage( imgUrl, imgTitle ) {
        const image = await client.uploads.createFromLocalFile({
            localPath: imgUrl,
            filename: 'catnew.png',
            skipCreationIfAlreadyExists: true,
            author: 'New author!',
            copyright: 'New copyright',
            default_field_metadata: {
                en: {
                    alt: imgTitle,
                    title: imgTitle,
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
        return image;
    }

     for (var cat of categoriesArr) {

         let image = uploadImage(cat.image, cat.title);
         console.log(image);
         categoryNameToRecord[cat.slug] = await client.items.create({
             itemType: 'Gs8ieCNhT6yTo34PAloR5A',
             title: cat.title,
             slug: cat.slug,
             description: {
                 en: createStructuredText(cat.description.en),
                 ru: createStructuredText(cat.description.ru),
                 sv: createStructuredText(cat.description.sv)
             },
             image
         });
     }
}
