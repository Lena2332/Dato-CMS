import { buildClient } from '@datocms/cma-client-node';
async function run() {
    const client = buildClient({ apiToken: `${process.env.NEXT_DATOCMS_API_TOKEN}` });

    const modelIdOrApiKey = 'blog_post';

    const itemType = await client.itemTypes.find(modelIdOrApiKey);

    console.log(itemType);
}

run();