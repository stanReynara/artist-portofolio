import { FaTwitter, FaYoutube, FaTwitch, FaInstagram } from "react-icons/fa";

type Props = {
  twitter?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
};

export default function SocialIcons({
  twitter,
  youtube,
  twitch,
  instagram,
}: Props) {
  return (
    <div className="flex space-x-4 mt-2 text-2xl">
      {twitter && (
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-400 transition-colors"
        >
          <FaTwitter />
        </a>
      )}
      {youtube && (
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition-colors"
        >
          <FaYoutube />
        </a>
      )}
      {twitch && (
        <a
          href={twitch}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-purple-500 transition-colors"
        >
          <FaTwitch />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition-colors"
        >
          <FaInstagram />
        </a>
      )}
    </div>
  );
}
