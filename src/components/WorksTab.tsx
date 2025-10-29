import Title from "@components/typography/Title";
import ImageGallery from "@components/ImageGallery";
import Image from "next/image";

export default function WorksTab() {
  return (
    <>
      <Title>Works</Title>
      <ImageGallery>
        <Image src="/images/mfy1.png" alt="Work 1" width={400} height={400} />
        <Image src="/images/mfy2.png" alt="Work 2" width={400} height={400} />
        <Image src="/images/mfy3.png" alt="Work 3" width={400} height={400} />
        <Image src="/images/mfy4.png" alt="Work 4" width={400} height={400} />
        <Image src="/images/mfy5.png" alt="Work 5" width={400} height={400} />
        <Image src="/images/mzk1.png" alt="Work 6" width={400} height={400} />
        <Image src="/images/mzk2.png" alt="Work 7" width={400} height={400} />
        <Image src="/images/mzk3.png" alt="Work 8" width={400} height={400} />
        <Image src="/images/mzk4.png" alt="Work 9" width={400} height={400} />
        <Image src="/images/mzk5.png" alt="Work 10" width={400} height={400} />
        <Image src="/images/mzk6.png" alt="Work 11" width={400} height={400} />
      </ImageGallery>
    </>
  );
}
