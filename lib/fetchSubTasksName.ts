// lib/fetchSubTasksName.ts
import { notion } from "./notion";

type PageRelation = { id: string };

export async function getTaskNamesFromRelation(
  relationArray: PageRelation[]
): Promise<{ name: string; status: string }[]> {
  // If no relations exist, return empty list immediately
  if (!relationArray?.length) return [];

  try {
    // Fetch all related pages in parallel for better performance
    const pages = await Promise.all(
      relationArray.map(async (rel) => {
        const page = await notion.pages.retrieve({ page_id: rel.id });

        // Get the status safely
        const status =
          page?.properties?.Status?.status?.name?.trim() || "No Status";

        // Find the property that contains the title (usually the "Name" column)
        const titleProperty = Object.values(page.properties).find(
          (prop: any) => prop.type === "title"
        ) as any;

        // Extract the title text safely
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
