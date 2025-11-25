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
      response.results.map(async (block) => {
        if (!("type" in block)) {
          // Unsupported or partial block, just return it
          return block;
        }

        if (block.has_children) {
          const children = await getBlocksRecursively(block.id, depth + 1);
          return { ...block, children };
        }

        return block;
      })
    );

    return blocks;
  }

  // console.log(`🚀 Fetching Notion blocks for envKey "${envKey}"...`);
  const allBlocks = await getBlocksRecursively(blockId);
  // console.log(`✅ Finished fetching blocks (total: ${allBlocks.length})`);
  return allBlocks;
}

// 👇 ADD THIS NEW FUNCTION
export async function fetchPageFromNotion(pageId: string) {
  try {
    // This is the call you need to make
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response;
  } catch (error) {
    console.error(`Failed to fetch page ${pageId}:`, error);
    return null;
  }
}
