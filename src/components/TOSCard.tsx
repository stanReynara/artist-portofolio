type Props = {
  title: string;
  accordionDetails: accordionDetails[];
};

type accordionDetails = {
  accordionTitle: string;
  accordionContent: string;
};

export default async function TOSCard({ title, accordionDetails }: Props) {
  return (
    <>
      <div className="card w-3xl bg-base-100 shadow-xl">
        <div className="card-body border-2 border-primary rounded-xl">
          <h1 className="card-title text-neutral text-3xl">{title}</h1>
          <div className="divider divider-neutral"></div>
          {accordionDetails.map((detail, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-primary/50 border-2 border-primary"
            >
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-neutral font-semibold">
                ✦ {detail.accordionTitle}
              </div>
              <div className="collapse-content text-neutral text-sm">
                {detail.accordionContent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
