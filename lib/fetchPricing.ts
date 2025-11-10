import {
  fetchDataSourceFromNotion,
  fetchPageFromNotion,
} from "./fetchFromNotion";

// --- TYPES ---

// The final, combined data structure we want to return
export type PricingInfo = {
  title: string;
  type: string;
  description: string;
  variations: Record<string, string>; // e.g., { "Bust Up": "$55", "Half Body": "+$10-20" }
  images: string[]; // <-- ADDED: Array of image URLs
};

// Represents one item in a Notion "Relation" array
type NotionRelation = {
  id: string;
};

// Represents one item in a Notion "Rollup" array (of text)
type NotionRollupTextItem = {
  type: "rich_text";
  rich_text: {
    type: "text";
    text: { content: string; link: null };
    plain_text: string;
  }[];
};

// --- ADDED: Type for a Notion File object (in a 'files' property) ---
type NotionFile = {
  name: string;
  type: "file" | "external";
  file?: { url: string; expiry_time: string }; // Internal Notion file
  external?: { url: string }; // External file link
};

/**
 * Fetches the names of variations from a "Relation" property.
 * This is the "join" operation: it takes an array of page IDs
 * and returns an array of their names.
 */
async function fetchVariationNamesFromRelation(
  relationArray: NotionRelation[]
): Promise<string[]> {
  if (!relationArray || relationArray.length === 0) {
    return [];
  }

  // 1. Create an array of fetch promises
  const namePromises = relationArray.map((relation) =>
    // We assume fetchPageFromNotion is a new function you'll create
    // that fetches a single page by ID.
    // e.g., using `notion.pages.retrieve({ page_id: relation.id })`
    fetchPageFromNotion(relation.id)
  );

  // 2. Wait for all fetches to complete
  const variationPages = await Promise.all(namePromises);

  // 3. Extract the 'Name' property from each fetched page
  const names = variationPages.map((page) => {
    if (!page) return "Error";
    const props = (page as any).properties; // Cast to 'any' to access properties
    return (
      props?.["Name"]?.title?.[0]?.plain_text?.trim() || "Untitled Variation"
    );
  });

  return names;
}

/**
 * Zips two arrays (names and prices) into a variations object.
 */
function zipVariations(
  names: string[],
  prices: string[]
): Record<string, string> {
  const variations: Record<string, string> = {};

  names.forEach((name, index) => {
    // Use the name as the key and the corresponding price as the value
    variations[name] = prices[index] || "N/A";
  });

  return variations;
}

/**
 * Main function to fetch and process all commission pricing info.
 */
export async function fetchPricing(): Promise<PricingInfo[]> {
  const data = await fetchDataSourceFromNotion(
    "NOTION_COMMISSION_TYPE_DATASOURCE_ID" // Get ID from environment
  );

  if (!data?.results) return [];

  console.log(
    "✅ Fetched main commission data from Notion. Now fetching relations..."
  );

  // We must use Promise.all to asynchronously process each page
  const pricingPromises = data.results.map(
    async (page: any): Promise<PricingInfo> => {
      const props = page.properties;

      // 1. Extract all the data we *do* have from the main page
      const title = props["Name"]?.title?.[0]?.plain_text?.trim() || "Untitled";
      const type = props["Type"]?.select?.name || "Uncategorized";
      const description =
        props["Description"]?.rich_text?.[0]?.plain_text?.trim() || "";

      // --- ADDED: 1.5 Extract Image URLs ---
      const notionImageFiles: NotionFile[] = props["Images"]?.files || [];
      const images: string[] = notionImageFiles.map((file) => {
        if (file.type === "external") {
          return file.external!.url; // Use external URL
        }
        if (file.type === "file") {
          return file.file!.url; // Use internal file URL
        }
        // Provide a fallback for any unexpected case
        return "https://placehold.co/600x400?text=Invalid+Image";
      });
      //

      // 2. Get the *relation IDs* for variations
      const variationRelations: NotionRelation[] =
        props["Variations"]?.relation || [];

      // 3. Get the *prices* from the rollup
      const variationPrices: string[] =
        props["Price per Variation"]?.rollup?.array?.map(
          (item: NotionRollupTextItem) =>
            item.rich_text?.[0]?.plain_text || "N/A"
        ) || [];

      // 4. Fetch the *names* using the relation IDs (This is the async part)
      const variationNames = await fetchVariationNamesFromRelation(
        variationRelations
      );

      // 5. "Zip" the names and prices into the final object
      const variations = zipVariations(variationNames, variationPrices);

      // 6. Return the complete, combined object
      return {
        title,
        type,
        description,
        variations,
        images, // <-- ADDED
      };
    }
  );

  // Wait for all pages to be processed
  const pricingInfo = await Promise.all(pricingPromises);

  console.log("✅ All data processed. Sorting list...");

  // --- MODIFICATION: Sort the final array alphabetically by 'type' ---
  const sortedPricingInfo = pricingInfo.sort((a, b) =>
    a.type.localeCompare(b.type)
  );
  //

  console.log(sortedPricingInfo);

  return sortedPricingInfo;
}
