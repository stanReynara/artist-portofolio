import WorksTab from "@components/WorksTab";
import ProfileGallery from "@components/ProfileGallery";
import { fetchArtists } from "lib/fetchArtists";
import { fetchWorks } from "lib/fetchWorks";

export const dynamic = "force-static";

export default async function Home() {
  const artists = await fetchArtists();
  const works = await fetchWorks();

  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileGallery artists={artists} />
      <WorksTab works={works} />
    </div>
  );
}
