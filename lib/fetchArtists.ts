import axios from "axios";

export async function fetchArtists() {
  const databaseId = process.env.NOTION_ARTIST_DB; // or use process.env.NOTION_ARTIST_DB
  const notionKey = process.env.NOTION_SECRET!;

  const url = `https://api.notion.com/v1/databases/${databaseId}/query`;

  const response = await axios.post(
    url,
    {}, // empty body means "no filters"
    {
      headers: {
        Authorization: `Bearer ${notionKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
    }
  );

  const data = response.data;

  const artists = data.results.map((page: any) => {
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

  return artists;
}
