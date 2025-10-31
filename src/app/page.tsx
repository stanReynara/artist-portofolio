import WorksTab from "@components/WorksTab";
import ProfileGallery from "@components/ProfileGallery";
import { fetchArtists } from "lib/fetchArtists";
import { fetchWorks } from "lib/fetchWorks";

export default async function Home() {
  // Dev build only, build/prod version should not fetch every page visit
  const artists = await fetchArtists();
  const works = await fetchWorks();

  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileGallery artists={artists} />
      <WorksTab works={works} />
    </div>
  );
}
