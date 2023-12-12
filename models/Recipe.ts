import {ResponsiveImage} from "@/models/ResponsiveImage";

export interface Recipe {
    id: string,
    title: string,
    mainImage: {
        responsiveImage: ResponsiveImage
    },
    description?: object,
    steps?: object
}