import {ResponsiveImage} from "@/models/ResponsiveImage";

export interface StepI {
    id: string,
    title: string,
    photo: {
        responsiveImage: ResponsiveImage
    },
    descr: string
}