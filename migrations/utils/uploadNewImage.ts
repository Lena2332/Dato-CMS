import {Client} from "@datocms/cli/lib/cma-client-node";

export default async function uploadImg(
    client: Client,
    imgSrc: string,
    alt: string
) {
    const uploadImg = await client.uploads.createFromLocalFile({
        // local path of the file to upload
        localPath: imgSrc,
        // if you want, you can specify a different base name for the uploaded file
        filename: 'different-image-name.png',
        // skip the upload and return an existing resource if it's already present in the Media Area:
        skipCreationIfAlreadyExists: true,
        // specify some additional metadata to the upload resource
        author: 'New author!',
        copyright: 'New copyright',
        default_field_metadata: {
            en: {
                alt: alt,
                title: alt,
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
    return uploadImg;

}