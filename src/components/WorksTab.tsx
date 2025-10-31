"use client";
import { Title } from "@components/Typography";
import ImageGallery from "@components/ImageGallery";
import ImageWork from "@components/ImageWork";

type Works = {
  src: string;
  description: string;
  width?: number;
  height?: number;
  redirect?: string | null;
};

type Props = {
  works: Works[];
};

export default function WorksTab({ works }: Props) {
  return (
    <>
      <Title>Works</Title>
      <ImageGallery>
        {works.map((work) => (
          <ImageWork
            key={work.src}
            src={work.src}
            description={work.description}
            width={work.width ?? 400}
            height={work.height ?? 400}
            redirect={work.redirect ?? null}
          />
        ))}
      </ImageGallery>
    </>
  );
}
