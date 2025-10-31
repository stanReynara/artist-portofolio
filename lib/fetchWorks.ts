import { fetchDataSourceFromNotion } from "./fetchFromNotion";

export async function fetchWorks() {
  // console.log("Fetching works from Notion...");

  const response = await fetchDataSourceFromNotion(
    "NOTION_WORKS_DATASOURCE_ID"
  );

  const works = response.results.map((page: any) => {
    const props = page.properties;

    const description =
      props?.Description?.title?.[0]?.plain_text?.trim() || "";

    const imageFile = props?.["Image File"]?.files?.[0];

    // TODO: image size can be large, going above 7s to load will result in timeout
    // Find a way to optimize this
    const src =
      imageFile?.file?.url ??
      imageFile?.external?.url ??
      "/images/default-image.png";

    const width = props?.Width?.number ?? null;
    const height = props?.Height?.number ?? null;

    const redirect =
      props?.Redirect?.url ||
      props?.Redirect?.rich_text?.[0]?.plain_text?.trim() ||
      null;

    return {
      src, // ✅ renamed here
      description,
      width,
      height,
      redirect,
    };
  });

  // console.log("Works fetched:", JSON.stringify(works, null, 2));

  return works;
}
