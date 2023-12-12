import {parse5ToStructuredText} from "datocms-html-to-structured-text";
import {parse} from "parse5";

export default async function createStructuredText(htmlText: string) {
    const result = await parse5ToStructuredText(
        parse(htmlText, {
            sourceCodeLocationInfo: true,
        })
    );

    return result;
}