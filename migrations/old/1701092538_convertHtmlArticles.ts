import getModelIdsByApiKey from '../utils/getModelIdsByApiKey';
import createStructuredTextFieldFrom from '../utils/createStructuredTextFieldFrom';
import htmlToStructuredText from '../utils/htmlToStructuredText';
import getAllRecords from '../utils/getAllRecords';
import swapFields from '../utils/swapFields';
import convertImgsToBlocks from '../utils/convertImgsToBlocks';
import { Client, SimpleSchemaTypes } from '@datocms/cli/lib/cma-client-node';

type HtmlArticleType = SimpleSchemaTypes.Item & {
  title: string;
  description: string;
};
export default async function convertHtmlArticles(client: Client) {
  const modelIds = await getModelIdsByApiKey(client);
  await createStructuredTextFieldFrom(client, 'recipe', 'description', [
    modelIds.image_block.id,
  ]);

  const records = (await getAllRecords(
      client,
      'recipe',
  )) as HtmlArticleType[];
  for (const record of records) {
    const structuredTextContent = await htmlToStructuredText(
        record.description,
        convertImgsToBlocks(client, modelIds),
    );

    await client.items.update(record.id, {
      structured_text_content: structuredTextContent,
    });

    if (record.meta.status !== 'draft') {
      await client.items.publish(record.id);
    }
  }
  await swapFields(client, 'html_article', 'content');
}