import {
  FaTwitter,
  FaYoutube,
  FaTwitch,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

type Props = {
  twitter?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
  discord?: string;
};

export default function SocialIcons({
  twitter,
  youtube,
  twitch,
  instagram,
  discord,
}: Props) {
  return (
    <div className="flex space-x-4 mt-2 text-2xl">
      {twitter && (
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-400 transition-colors hover:bg-primary rounded-xl p-2"
        >
          <FaTwitter />
        </a>
      )}
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors hover:bg-primary rounded-xl p-2"
        >
          <FaYoutube />
        </a>
      )}
      {twitch && (
        <a
          href={twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors hover:bg-primary rounded-xl p-2"
        >
          <FaTwitch />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition-colors hover:bg-primary rounded-xl p-2"
        >
          <FaInstagram />
        </a>
      )}
      {discord && (
        <a
          href={discord}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-500 transition-colors hover:bg-primary rounded-xl p-2"
        >
          <FaDiscord />
        </a>
      )}
    </div>
  );
}
