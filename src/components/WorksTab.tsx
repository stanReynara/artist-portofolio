import { Title } from "@components/Typography";
import ImageGallery from "@components/ImageGallery";
import Image from "next/image";

export default function WorksTab() {
  return (
    <>
      <Title>Works</Title>
      <ImageGallery>
        <Image src="/images/mfy1.png" alt="mfy1" width={400} height={400} />
        <Image src="/images/mfy2.png" alt="mfy2" width={400} height={400} />
        <Image src="/images/mfy3.png" alt="mfy3" width={400} height={400} />
        <Image src="/images/mfy4.png" alt="mfy4" width={400} height={400} />
        <Image src="/images/mfy5.png" alt="mfy5" width={400} height={400} />
        <Image src="/images/mzk1.png" alt="mzk1" width={400} height={400} />
        <Image src="/images/mzk2.png" alt="mzk2" width={400} height={400} />
        <Image src="/images/mzk3.png" alt="mzk3" width={400} height={400} />
        <Image src="/images/mzk4.png" alt="mzk4" width={400} height={400} />
        <Image src="/images/mzk5.png" alt="mzk5" width={400} height={400} />
        <Image src="/images/mzk6.png" alt="mzk6" width={400} height={400} />
        <Image src="/images/ena1.png" alt="ena1" width={400} height={400} />
        <Image src="/images/ena2.png" alt="ena2" width={400} height={400} />
        <Image src="/images/ena3.png" alt="ena3" width={400} height={400} />
        <Image src="/images/ena4.png" alt="ena4" width={400} height={400} />
        <Image src="/images/ena5.png" alt="ena5" width={400} height={400} />
        <Image src="/images/ena6.png" alt="ena6" width={400} height={400} />
        <Image src="/images/knd1.png" alt="knd1" width={400} height={400} />
        <Image src="/images/knd2.png" alt="knd2" width={400} height={400} />
        <Image src="/images/knd3.png" alt="knd3" width={400} height={400} />
      </ImageGallery>
    </>
  );
}
