import WorksTab from "@components/WorksTab";
import ProfileGallery from "@components/ProfileGallery";
import { fetchArtists } from "lib/fetchArtists";

export default async function Home() {
  const artists = await fetchArtists();

  return (
    <div className="flex flex-col items-center justify-center">
      <ProfileGallery artists={artists} />
      <WorksTab />
    </div>
  );
}
