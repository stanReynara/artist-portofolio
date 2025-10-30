import { TextInput } from "@components/TextInput";
import { Heading1 } from "@components/Typography";
import Profile from "@components/Profile";

export default function Contact() {
  const groupEmail = "contact@artgroup.com";

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

  return (
    // This wrapper resets the layout
    <div className="w-full flex justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-7xl min-h-screen">
        {/* Left side - Contact Info */}
        <div className="w-full md:w-1/2 bg-base-100 p-8 flex flex-col items-center overflow-y-auto">
          <Heading1 color="text-accent-content">Contact Us</Heading1>

          <div className="mt-4 mb-8 text-center">
            <p className="text-lg text-accent-content">
              For general inquiries, reach us at:
              <br />
              <a
                href={`mailto:${groupEmail}`}
                className="text-accent-content font-semibold underline"
              >
                {groupEmail}
              </a>
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            {artists.map((artist) => (
              <Profile key={artist.name} {...artist} enableAvatar={false} />
            ))}
          </div>
        </div>

        {/* Right side - Placeholder / Future Contact Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-start p-8">
          <h2 className="text-3xl font-bold mb-4 text-accent-content">
            Get in Touch
          </h2>
          <p className="text-center text-neutral">
            You can also reach out through our group email or individual social
            media accounts on the left.
            <br />
          </p>

          {/* use a react hook form so we can easily handle form validation */}
          <form className="w-full text-neutral ">
            <TextInput label="Name" />
            <TextInput label="Company Name" />
            <TextInput label="Email" />
            <TextInput label="Project Name" />
            <TextInput label="Message" type="textarea" />

            <p className="text-sm text-neutral mt-4">
              By submitting this form, you agree to our <br />{" "}
              <a
                href="/tos"
                className="text-primary-content font-semibold underline"
              >
                Terms of Service
              </a>
              .
            </p>
            <p className="text-sm text-neutral mt-4">
              Please include the following information with your inquiry:
            </p>

            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li className="text-neutral text-sm">References</li>
              <li className="text-neutral text-sm">Budget (required)</li>
              <li className="text-neutral text-sm">Deadline</li>
            </ul>

            <button className="btn btn-primary mt-4 text-2xl">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
