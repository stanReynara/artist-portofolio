// lib/fetchSubTasksName.ts
import { notion } from "./notion";

type PageRelation = { id: string };

export async function getTaskNamesFromRelation(
  relationArray: PageRelation[]
): Promise<{ name: string; status: string }[]> {
  if (!relationArray?.length) return [];

  try {
    const pages = await Promise.all(
      relationArray.map(async (rel) => {
        const page = await notion.pages.retrieve({ page_id: rel.id });

        // ---------------------------------------------------------
        // FIX: Type Guard
        // Check if 'properties' exists on the page object.
        // If not, it's a PartialPageObjectResponse.
        // ---------------------------------------------------------
        if (!("properties" in page)) {
          return {
            name: "(Access Restricted)",
            status: "Unknown",
          };
        }

        // TypeScript now knows 'page' is the full 'PageObjectResponse'

        // Get the status safely (Use optional chaining just in case property names differ)
        const status =
          (page.properties?.Status as any)?.status?.name?.trim() || "No Status";

        // Find the property that contains the title
        const titleProperty = Object.values(page.properties).find(
          (prop: any) => prop.type === "title"
        ) as any;

        const title = titleProperty?.title?.[0]?.plain_text?.trim();

        return {
          name: title || "(Untitled Task)",
          status,
        };
      })
    );

    return pages;
  } catch (error: any) {
    console.error(
      "❌ Failed to fetch related task names:",
      error.message || error
    );
    return [];
  }
}
