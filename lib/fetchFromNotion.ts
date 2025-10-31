import { BlockObjectResponse } from "@notionhq/client";
import { notion } from "./notion";

/**
 * Generic Notion database fetcher
 * @param envKey The name of the environment variable that holds the Notion Data Source ID
 * @returns Notion query response
 */
export async function fetchDataSourceFromNotion(envKey: string) {
  const dataSourceId = process.env[envKey];

  if (!dataSourceId) {
    throw new Error(`❌ Missing environment variable: ${envKey}`);
  }

  console.log(`Fetching data from Notion [${envKey}]...`);

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
  });

  // console.log("✅ Fetched data from Notion", JSON.stringify(response, null, 2));

  return response;
}

export async function fetchBlocksFromNotion(envKey: string): Promise<any[]> {
  const blockId = process.env[envKey];
  if (!blockId) throw new Error(`❌ Missing environment variable: ${envKey}`);

  async function getBlocksRecursively(
    blockId: string,
    depth = 0
  ): Promise<any[]> {
    const response = await notion.blocks.children.list({ block_id: blockId });

    const blocks: any[] = await Promise.all(
      response.results.map(async (block: BlockObjectResponse) => {
        if (block.has_children) {
          console.log(
            `${"  ".repeat(depth)}🧩 Block "${block.id}" (${
              block.type
            }) has children — fetching deeper...`
          );
          const children = await getBlocksRecursively(block.id, depth + 1);
          console.log(
            `${"  ".repeat(depth)}📦 Children of ${block.id}:`,
            JSON.stringify(children, null, 2)
          );
          return { ...block, children };
        }
        return block;
      })
    );

    return blocks;
  }

  console.log(`🚀 Fetching Notion blocks for envKey "${envKey}"...`);
  const allBlocks = await getBlocksRecursively(blockId);
  console.log(`✅ Finished fetching blocks (total: ${allBlocks.length})`);
  return allBlocks;
}
