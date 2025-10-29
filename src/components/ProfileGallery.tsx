"use client";

import { useState } from "react";
import Profile from "./Profile";

type Artist = {
  name: string;
  aliases?: string[];
  avatarUrl: string;
  description: string;
  socials?: {
    twitter?: string;
    youtube?: string;
    twitch?: string;
    instagram?: string;
  };
};

type Props = {
  artists: Artist[];
};

export default function ProfileGallery({ artists }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Artist Selector */}
      <div className="flex justify-center flex-wrap gap-12 mb-6">
        {artists.map((artist, i) => (
          <button
            key={artist.name}
            onClick={() => setSelected(i)}
            className={`
              pb-2 text-lg font-medium transition-all duration-200 cursor-pointer
              ${
                selected === i
                  ? "border-b-2 border-primary-content text-primary-content" // active
                  : "border-b-2 border-transparent text-gray-700 hover:text-primary-content/80" // default + hover
              }
            `}
          >
            {artist.name}
          </button>
        ))}
      </div>

      {/* Active Profile */}
      <Profile {...artists[selected]} />
    </div>
  );
}
