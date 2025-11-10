import PriceCard from "@components/PriceCard";
import { Heading1, Heading2, Title } from "@components/Typography";
import { fetchPricing } from "lib/fetchPricing";

export default function Pricing() {
  const pricing = fetchPricing();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Title>Pricing</Title>
      <Heading1>Regular Illust</Heading1>
      {/* TODO: Make this into a component that supports children instead */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        <PriceCard
          title="Bust Up"
          description="Bust Up description"
          price="$60 / Rp. 600,000"
          images={[
            {
              src: "/images/mzk1.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk2.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk3.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk4.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk5.png",
              description: "Example",
              redirect: null,
            },
          ]}
        />
        <PriceCard
          title="Bust Up"
          description="Bust Up description"
          price="$60 / Rp. 600,000"
          images={[
            {
              src: "/images/mzk1.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk2.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk3.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk4.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk5.png",
              description: "Example",
              redirect: null,
            },
          ]}
        />
        <PriceCard
          title="Bust Up"
          description="Bust Up description"
          price="$60 / Rp. 600,000"
          images={[
            {
              src: "/images/mzk1.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk2.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk3.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk4.png",
              description: "Example",
              redirect: null,
            },
            {
              src: "/images/mzk5.png",
              description: "Example",
              redirect: null,
            },
          ]}
        />
      </div>
    </div>
  );
}
