import SocialIcons from "./SocialIcons";

type Props = {
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

export default function Profile({
  name,
  aliases,
  avatarUrl,
  description,
  socials,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-base-200 rounded-xl shadow-md p-6 gap-6 w-full max-w-3xl">
      {/* Avatar */}
      <div className="avatar">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={avatarUrl} alt={`${name}'s avatar`} />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-3xl font-bold">{name}</h2>

        {aliases && aliases.length > 0 && (
          <p className="text-sm text-gray-500">
            Also known as: {aliases.join(", ")}
          </p>
        )}

        {socials && <SocialIcons {...socials} />}

        <p className="mt-4 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
