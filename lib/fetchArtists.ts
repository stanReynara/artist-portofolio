import { fetchDataSourceFromNotion } from "./fetchFromNotion";

export async function fetchArtists() {
  // console.log("Fetching artists from Notion...");
  const response = await fetchDataSourceFromNotion(
    "NOTION_ARTIST_DATASOURCE_ID"
  );

  const artists = response.results.map((page: any) => {
    const props = page.properties;

    // Name (title)
    const name =
      props?.Name?.title?.[0]?.plain_text?.trim() || "Untitled Artist";

    // Alias (multi-select)
    const aliases = props?.Alias?.multi_select?.map((s: any) => s.name) ?? [];

    // Avatar (file or external URL)
    const avatarFile = props?.Avatar?.files?.[0];
    const avatarUrl =
      avatarFile?.file?.url ??
      avatarFile?.external?.url ??
      "/images/default-avatar.png";

    // Description (rich text)
    const description =
      props?.Description?.rich_text?.[0]?.plain_text?.trim() || "";

    // Social links (rich text)
    const getUrl = (prop: any) =>
      prop?.url || prop?.rich_text?.[0]?.plain_text?.trim() || "";

    const socials = {
      twitter: getUrl(props?.Twitter),
      youtube: getUrl(props?.Youtube),
      twitch: getUrl(props?.Twitch),
      instagram: getUrl(props?.Instagram),
      discord: getUrl(props?.Discord),
    };

    // Remove empty socials
    const filteredSocials = Object.fromEntries(
      Object.entries(socials).filter(([_, v]) => v)
    );

    return {
      name,
      aliases,
      avatarUrl,
      description,
      socials: filteredSocials,
    };
  });

  // console.log("Artists fetched:", JSON.stringify(artists, null, 2));

  return artists;
}
