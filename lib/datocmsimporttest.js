import { buildClient } from '@datocms/cma-client-node';
import htmlToStructuredText from '@/migrations/utils/htmlToStructuredText';
import createStructuredText from "@/migrations/utils/createStructuredText";
export const datocmsimporttest = async () => {
    const client = buildClient({ apiToken: `${process.env.NEXT_DATOCMS_API_TOKEN}` });

    //*** Get all fields of model ***//
    const modelIdOrApiKey = 'recipe';
    const itemType = await client.itemTypes.find(modelIdOrApiKey);

    // console.log("-------------------------------//");
    // console.log(itemType);
    // console.log("-------------------------------//");

    // RESULT
    // {
    //     id: 'VRPgx7LCQySz6dFx2sMlxQ',
    //         type: 'item_type',
    //     name: 'Recipes',
    //     singleton: false,
    //     sortable: false,
    //     api_key: 'recipe',
    //     ordering_direction: null,
    //     ordering_meta: null,
    //     tree: false,
    //     modular_block: false,
    //     draft_mode_active: false,
    //     all_locales_required: false,
    //     collection_appearance: 'table',
    //     has_singleton_item: false,
    //     hint: null,
    //     inverse_relationships_enabled: false,
    //     fields: [
    //     { id: 'OFeFzkQXSFydmSKmx4hovA', type: 'field' },
    //     { id: 'MpHX_o2XSDqV1ECDUVtSLQ', type: 'field' },
    //     { id: 'DIK2eNUlRxaLgxpWS6pqUg', type: 'field' },
    //     { id: 'QCF0AlZATQ6ebQC9TS8qtQ', type: 'field' },
    //     { id: 'ZW7bt8AeR8yBlRBH7yGqqQ', type: 'field' },
    //     { id: 'BB_xyNQOR1emnixS1tKzYQ', type: 'field' },
    //     { id: 'Wpm_NBIUSVeGro3m5xY9mg', type: 'field' },
    //     { id: 'T-r07NXwRmuJLoDBWGzzQQ', type: 'field' }
    // ],
    //     fieldsets: [],
    //     singleton_item: null,
    //     ordering_field: null,
    //     title_field: { id: 'OFeFzkQXSFydmSKmx4hovA', type: 'field' },
    //     image_preview_field: { id: 'MpHX_o2XSDqV1ECDUVtSLQ', type: 'field' },
    //     excerpt_field: null,
    //         workflow: null,
    //     meta: { has_singleton_item: false }
    // }

    //*** Get all models ***//
    const models = await client.itemTypes.list();
    // console.log("-------------------------------//");
    // console.log(models);
    // console.log("-------------------------------//");

    //RESULT
    // [
    //     {
    //         id: 'Gs8ieCNhT6yTo34PAloR5A',
    //         type: 'item_type',
    //         name: 'Categories',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'category',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: false,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [ [Object], [Object], [Object], [Object] ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: { id: 'XffvXAUjQHqkMC103zfdmQ', type: 'field' },
    //         image_preview_field: { id: 'W8fJNZZySXOWcAKmTMpZtw', type: 'field' },
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'HvuUJ9g-RUWheSPGkmV2Vg',
    //         type: 'item_type',
    //         name: 'Tags',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'tag',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: false,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [ [Object], [Object] ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: { id: 'AN_4ybTMRbaO9YKoL9Jjvg', type: 'field' },
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'NpN1SLHnRvKpx6zIlZnlNQ',
    //         type: 'item_type',
    //         name: 'Steps with image',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'steps_with_image',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: true,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [ [Object], [Object], [Object] ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: null,
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'PDoFS1BfRU6C4HsE7cm4Lw',
    //         type: 'item_type',
    //         name: 'Users',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'user',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: false,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [
    //             [Object], [Object],
    //             [Object], [Object],
    //             [Object], [Object],
    //             [Object]
    //         ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: { id: 'DD_iPZK3RdyHm6Yw1Tx9rA', type: 'field' },
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'VRPgx7LCQySz6dFx2sMlxQ',
    //         type: 'item_type',
    //         name: 'Recipes',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'recipe',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: false,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [
    //             [Object], [Object],
    //             [Object], [Object],
    //             [Object], [Object],
    //             [Object], [Object]
    //         ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: { id: 'OFeFzkQXSFydmSKmx4hovA', type: 'field' },
    //         image_preview_field: { id: 'MpHX_o2XSDqV1ECDUVtSLQ', type: 'field' },
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'XH5ASPjJSryjRkwUwRb7ag',
    //         type: 'item_type',
    //         name: 'Contact Block',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'contact_block',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: true,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [ [Object], [Object] ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: null,
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     },
    //     {
    //         id: 'bdNNUMU5S4-z2G3v-Kxl6A',
    //         type: 'item_type',
    //         name: 'seo',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'seo',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: true,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: null,
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    //     }
    // ]

    //*** Handler return array model_api_key : model ***//
    const ModelsId = models.reduce(
        (acc, itemType) => ({
            ...acc,
            [itemType.api_key]: itemType,
        }),
        {},
    );

    //console.log(ModelsId);

    //RESULT
    // recipe: {
    //     id: 'VRPgx7LCQySz6dFx2sMlxQ',
    //         type: 'item_type',
    //         name: 'Recipes',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'recipe',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: false,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [
    //         [Object], [Object],
    //         [Object], [Object],
    //         [Object], [Object],
    //         [Object], [Object]
    //     ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: { id: 'OFeFzkQXSFydmSKmx4hovA', type: 'field' },
    //     image_preview_field: { id: 'MpHX_o2XSDqV1ECDUVtSLQ', type: 'field' },
    //     excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    // },
    // contact_block: {
    //     id: 'XH5ASPjJSryjRkwUwRb7ag',
    //         type: 'item_type',
    //         name: 'Contact Block',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'contact_block',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: true,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [ [Object], [Object] ],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: null,
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    // },
    // seo: {
    //     id: 'bdNNUMU5S4-z2G3v-Kxl6A',
    //         type: 'item_type',
    //         name: 'seo',
    //         singleton: false,
    //         sortable: false,
    //         api_key: 'seo',
    //         ordering_direction: null,
    //         ordering_meta: null,
    //         tree: false,
    //         modular_block: true,
    //         draft_mode_active: false,
    //         all_locales_required: false,
    //         collection_appearance: 'table',
    //         has_singleton_item: false,
    //         hint: null,
    //         inverse_relationships_enabled: false,
    //         fields: [],
    //         fieldsets: [],
    //         singleton_item: null,
    //         ordering_field: null,
    //         title_field: null,
    //         image_preview_field: null,
    //         excerpt_field: null,
    //         workflow: null,
    //         meta: { has_singleton_item: false }
    // }

    //*** FIND INFORMATION ABOUT FIELD ***//
    const modelIdOrApiKey2 = 'recipe::description';
    const legacyField = await client.fields.find(modelIdOrApiKey2);
    // console.log("//-------------------------------//");
    // console.log(legacyField);
    // console.log("//-------------------------------//");

    //RESULT
    // {
    //     id: 'QCF0AlZATQ6ebQC9TS8qtQ',
    //         type: 'field',
    //     label: 'Description',
    //     field_type: 'structured_text',
    //     api_key: 'description',
    //     hint: null,
    //     localized: true,
    //     validators: {
    //     structured_text_blocks: { item_types: [] },
    //     structured_text_links: {
    //         on_publish_with_unpublished_references_strategy: 'fail',
    //             on_reference_unpublish_strategy: 'delete_references',
    //             on_reference_delete_strategy: 'delete_references',
    //             item_types: []
    //     }
    // },
    //     position: 4,
    //         appearance: {
    //     addons: [],
    //         editor: 'structured_text',
    //         parameters: {
    //         marks: [Array],
    //             nodes: [Array],
    //             heading_levels: [Array],
    //             blocks_start_collapsed: false,
    //             show_links_meta_editor: true,
    //             show_links_target_blank: true
    //     }
    // },
    //     default_value: { en: null, ru: null, sv: null },
    //     deep_filtering_enabled: false,
    //         item_type: { id: 'VRPgx7LCQySz6dFx2sMlxQ', type: 'item_type' },
    //     fieldset: null
    // }

    //*** ADD NEW FIELD WITH BLOCK ***//
    const modelApiKeyC = 'recipe';
    const label = 'Description ST';
    const newApiKey = 'descriptionst';
    const blocks = [
        'SkVzIiV0SOW4WzqWDD8JBw',
    ];

    // const newField = client.fields.create(modelApiKeyC, {
    //     label: label,
    //     api_key: newApiKey,
    //     field_type: 'structured_text',
    //     fieldset: null,
    //     validators: {
    //         structured_text_blocks: {
    //             item_types: []
    //         },
    //         structured_text_links: { item_types: [] },
    //     },
    // });

    // console.log("//-------------------------------//");
    // console.log(newField);
    // console.log("//-------------------------------//");
    // RESULT //
    // Promise {
    //     <pending>,
    //         [Symbol(async_id_symbol)]: 259525,
    //         [Symbol(trigger_async_id_symbol)]: 259513,
    //         [Symbol(kResourceStore)]: {
    //             headers: [Getter],
    //             cookies: [Getter],
    //             mutableCookies: [Getter],
    //             draftMode: [Getter]
    //         },
    //         [Symbol(kResourceStore)]: {
    //             isStaticGeneration: false,
    //             urlPathname: '/recipe/WuIAMbBWTt6Bs1rkMQ8hAQ?_rsc=nxpfo',
    //             pagePath: '/recipe/[slug]/page',
    //             incrementalCache: IncrementalCache {
    //             locks: [Map],
    //             unlocks: [Map],
    //             dev: true,
    //             minimalMode: false,
    //             requestHeaders: [Object],
    //             requestProtocol: 'http',
    //             allowedRevalidateHeaderKeys: undefined,
    //             prerenderManifest: [Object],
    //             fetchCacheKeyPrefix: '',
    //             cacheHandler: [FileSystemCache]
    //         },
    //             isRevalidate: false,
    //             isPrerendering: undefined,
    //             fetchCache: undefined,
    //             isOnDemandRevalidate: false,
    //             isDraftMode: false,
    //             experimental: { ppr: false },
    //             postpone: undefined,
    //             fetchMetrics: [ [Object], [Object], [Object], [Object] ],
    //             tags: [
    //             '_N_T_/layout',
    //             '_N_T_/recipe/layout',
    //             '_N_T_/recipe/[slug]/layout',
    //             '_N_T_/recipe/[slug]/page',
    //             '_N_T_/recipe/WuIAMbBWTt6Bs1rkMQ8hAQ'
    //             ],
    //             revalidate: false,
    //             nextFetchId: 5
    //         },
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: undefined,
    //         [Symbol(kResourceStore)]: {
    //             status: 0,
    //             flushScheduled: true,
    //             fatalError: null,
    //             destination: ReadableByteStreamController {},
    //             bundlerConfig: {
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\app-router.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\app-router.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\error-boundary.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\error-boundary.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\layout-router.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\layout-router.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\not-found-boundary.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\not-found-boundary.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\render-from-template-context.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\render-from-template-context.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\components\\static-generation-searchparams-bailout-provider.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\components\\static-generation-searchparams-bailout-provider.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\client\\link.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\dist\\esm\\client\\link.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\next\\font\\google\\target.css?{"path":"app\\\\layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\app\\globals.css': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\react-datocms\\dist\\esm\\Image\\index.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\react-datocms\\dist\\esm\\useQuerySubscription\\index.js': [Object],
    //             'C:\\Users\\olekup\\projects\\dato-app\\node_modules\\react-datocms\\dist\\esm\\useSiteSearch\\index.js': [Object]
    //         },
    //             cache: Map(0) {},
    //             nextChunkId: 4,
    //             pendingChunks: 2,
    //             hints: Set(1) {
    //             'L[style]/_next/static/css/app/layout.css?v=1701173895741'
    //         },
    //             abortableTasks: Set(2) { [Object], [Object] },
    //             pingedTasks: [ [Object], [Object] ],
    //             completedImportChunks: [],
    //             completedHintChunks: [],
    //             completedRegularChunks: [],
    //             completedErrorChunks: [],
    //             writtenSymbols: Map(0) {},
    //             writtenClientReferences: Map(0) {},
    //             writtenServerReferences: Map(0) {},
    //             writtenProviders: Map(0) {},
    //             writtenObjects: WeakMap { <items unknown> },
    //         identifierPrefix: '',
    //         identifierCount: 1,
    //         taintCleanupQueue: [],
    //         onError: [Function (anonymous)],
    //         onPostpone: [Function: eS],
    //         toJSON: [Function: toJSON]
    //         }
    //         }

    // GET ALL RECORDS
    const records = await client.items.list({
        filter: { type: modelApiKeyC },
        nested: true,
    });

    // console.log("//-------------------------------//");
    // console.log(records);
    // console.log("//-------------------------------//");

    // RESULT
    // [
    //     {
    //         id: 'WuIAMbBWTt6Bs1rkMQ8hAQ',
    //         type: 'item',
    //         title: {
    //             en: 'Eggs in the pots',
    //             ru: 'Eggs in the pots',
    //             sv: 'Eggs in the pots'
    //         },
    //         main_image: {
    //             alt: null,
    //             title: null,
    //             custom_data: {},
    //             focal_point: null,
    //             upload_id: 'VQ0oBrMqSg-rZs_L5B5HvQ'
    //         },
    //         additional_images: [],
    //         description: { en: [Object], ru: [Object], sv: [Object] },
    //         tags: [ 'QK6pGvs6Q-eJydrDnWBYLw' ],
    //         categories: [ 'FSzKDaRtQi-2vzmHnltQ0g' ],
    //         created: '2023-11-14',
    //         steps: { en: [Array], ru: [], sv: [] },
    //         descriptionst: null,
    //         item_type: { id: 'VRPgx7LCQySz6dFx2sMlxQ', type: 'item_type' },
    //         creator: { id: '104698', type: 'account' },
    //         meta: {
    //             created_at: '2023-11-14T13:54:32.246+00:00',
    //             updated_at: '2023-11-21T09:10:01.185+00:00',
    //             published_at: '2023-11-21T09:10:01.235+00:00',
    //             publication_scheduled_at: null,
    //             unpublishing_scheduled_at: null,
    //             first_published_at: '2023-11-14T13:54:32.280+00:00',
    //             is_valid: true,
    //             is_current_version_valid: true,
    //             is_published_version_valid: true,
    //             status: 'published',
    //             current_version: 'edTo1NrdQUmYLhz3wyKPUQ',
    //             stage: null
    //         }
    //     }
    // ]

    // for (const record of records) {
    //     console.log(record.description.en.document.children);
    // }

    // let descrText = "<h1>Hello!</h1><p>Imported text :)</p>";
    //
    // console.log("//----2---------------------------//");
    // htmlToStructuredText(descrText)
    // console.log("//-----3--------------------------//");

    function handleProgress(info) {
        // info.type can be one of the following:
        //
        // * DOWNLOADING_FILE: client is downloading the asset from the specified URL
        // * REQUESTING_UPLOAD_URL: client is requesting permission to upload the asset to the DatoCMS CDN
        // * UPLOADING_FILE: client is uploading the asset
        // * CREATING_UPLOAD_OBJECT: client is finalizing the creation of the upload resource
        console.log('Phase:', info.type);
        // Payload information depends on the type of notification
        console.log('Details:', info.payload);
    }

    // const upload2 = await client.uploads.createFromLocalFile({
    //     // local path of the file to upload
    //     localPath: './public/health-beneiftis-of-pets-900x600.jpg',
    //     // if you want, you can specify a different base name for the uploaded file
    //     filename: 'different-image-name.png',
    //     // skip the upload and return an existing resource if it's already present in the Media Area:
    //     skipCreationIfAlreadyExists: true,
    //     // be notified about the progress of the operation.
    //     onProgress: handleProgress,
    //     // specify some additional metadata to the upload resource
    //     author: 'New author!',
    //     copyright: 'New copyright',
    //     default_field_metadata: {
    //         en: {
    //             alt: 'New default alt',
    //             title: 'New default title',
    //             focal_point: {
    //                 x: 0.3,
    //                 y: 0.6,
    //             },
    //             custom_data: {
    //                 watermark: true,
    //             },
    //         },
    //     },
    // });
    // console.log(upload2);
    const catID = `Gs8ieCNhT6yTo34PAloR5A`;

    let data = await client.items.create({
        item_type: { type: 'item_type', id: catID },
        title: {
            en: "qqqqq2",
            ru: "ssssss2",
            sv: "qqqqqqsd2"
        },
        slug: 'cattt2',
         //description: {
         //    en: createStructuredText(cat.description.en),
         //    ru: createStructuredText(cat.description.ru),
         //    sv: createStructuredText(cat.description.sv)
        // },
        // image
    });
    console.log(data);


}
