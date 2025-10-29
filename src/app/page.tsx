import WorksTab from "@components/WorksTab";
import ProfileGallery from "@components/ProfileGallery";

// TODO: Use notion API -> access database instead
// ON BUILD TIME

// Example data, images doesnt exist for now
const artists = [
  {
    name: "Mika Hoshino",
    aliases: ["Mika", "HoshinoM"],
    avatarUrl: "/images/stamp1.png",
    description:
      "An illustrator and VTuber known for soft pastel-themed art and cozy streams.",
    socials: {
      twitter: "https://twitter.com/mikahoshino",
      youtube: "https://youtube.com/@mikahoshino",
      twitch: "https://twitch.tv/mikahoshino",
    },
  },
  {
    name: "Zeno Kaze",
    aliases: ["Zeno", "KazeZ"],
    avatarUrl: "/images/stamp2.png",
    description:
      "A concept artist and designer who blends fantasy with modern elements.",
    socials: {
      twitter: "https://twitter.com/zenokaze",
      instagram: "https://instagram.com/zenokaze",
    },
  },
  {
    name: "Mofy",
    avatarUrl: "/images/stamp3.png",
    description:
      "Digital painter with a dreamy art style inspired by pastel tones and nature.",
  },
];

export default function Home() {
  return (
    <>
      <div className="min-h-[300px] transition-all duration-300">
        <ProfileGallery artists={artists} />
      </div>
      <WorksTab />
    </>
  );
}
