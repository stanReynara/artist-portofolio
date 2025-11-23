import PriceCard from "@components/PriceCard";
import { Heading1, Heading2, Title } from "@components/Typography";
import { fetchPricing } from "lib/fetchPricing";

export default async function Pricing() {
  const pricing = await fetchPricing();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Title>Pricing</Title>
      {/* TODO: Make this into a component that supports children instead */}
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
