import TOSCard from "@components/TOSCard";

const accordionDetails = [
  {
    accordionTitle: "Terms of Service",
    accordionContent:
      " 個人様は着手前の 【完全前払い】 とさせていただいております。​ご入金後のキャンセル／返金には対応いたしかねますので、ご留意くださいませ。お支払い期限日を過ぎてもお手続きがない場合、ご依頼はキャンセルといたします。​また、以降のお取引きをお断りさせていただく場合がございます。 ",
  },
  {
    accordionTitle: "Privacy Policy",
    accordionContent: "lalalalilililulu",
  },
  {
    accordionTitle: "Cookie Policy",
    accordionContent: "linggalgalgalgalgalgalgalgalgalgalgalgalgalgal",
  },
];

export default async function PricePage() {
  return (
    <div className="flex flex-col items-center">
      <TOSCard title="✦ Terms of Service" accordionDetails={accordionDetails} />
    </div>
  );
}
