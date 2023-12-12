import { parse } from 'parse5';
import {
    parse5ToStructuredText,
    Options,
} from 'datocms-html-to-structured-text';

import { validate } from 'datocms-structured-text-utils';
export default async function htmlToStructuredText(
    html: string
) {
    if (!html) {
        return null;
    }

    const result = await parse5ToStructuredText(
        parse(html, {
            sourceCodeLocationInfo: true,
        })
    );

    const validationResult = validate(result);
    if (!validationResult.valid) {
       throw new Error(validationResult.message);
    }
    return result;
}