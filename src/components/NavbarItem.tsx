"use client";

import { useRouter } from "next/navigation";
import { Heading1 } from "@components/Typography";

type Props = {
  destination?: string;
  title?: string;
};

export function NavbarItem({ destination = "/", title }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(destination)}
      className="btn text-xl hover:scale-115 hover:z-10 transition-transform 
            duration-300 
            ease-out border-none bg-transparent shadow-none focus:outline-none"
      type="button"
    >
      <Heading1 color="text-error">{title}</Heading1>
    </button>
  );
}
