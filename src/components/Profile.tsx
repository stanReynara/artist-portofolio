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
    discord?: string;
  };
  enableAvatar?: boolean;
};

export default function Profile({
  name,
  aliases,
  avatarUrl,
  description,
  socials,
  enableAvatar = true,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start bg-base-200 rounded-xl shadow-md p-6 gap-8 w-full max-w-4xl">
      {/* Avatar */}
      {enableAvatar ? (
        <div className="avatar shrink-0">
          <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatarUrl} alt={`'s avatar`} />
          </div>
        </div>
      ) : null}

      {/* Info */}
      <div className="flex-1 text-center sm:text-left text-base-content">
        <h2 className="text-3xl font-bold mb-1">{name}</h2>

        {aliases && aliases.length > 0 && (
          <p className="text-sm text-gray-500 mb-3">
            Also known as: {aliases.join(", ")}
          </p>
        )}

        {socials && (
          <div className="mb-4">
            <SocialIcons {...socials} />
          </div>
        )}

        <p className="text-base leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
