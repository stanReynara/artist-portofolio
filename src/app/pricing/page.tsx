import PriceCard from "@components/PriceCard";
import { Heading1, Heading2, Title } from "@components/Typography";
import { fetchPricing } from "lib/fetchPricing";
export const dynamic = "force-static";

export default async function Pricing() {
  const pricing = await fetchPricing();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Title>Pricing</Title>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {pricing.map((item, index) => {
          return (
            <PriceCard
              key={index}
              title={item.title}
              description={item.description}
              variations={item.variations}
              images={item.images.map((src) => ({
                src,
                description: item.title,
                redirect: null,
              }))}
            />
          );
        })}
      </div>
    </div>
  );
}
