"use client";
import Image from "next/image";
import { NavbarItem } from "@components/NavbarItem";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  return (
    <div className="navbar bg-base-100 shadow-sm grid grid-cols-3 items-center">
      {/* LEFT SECTION */}
      <div className="flex justify-center items-center">
        <NavbarItem title="Home" destination="/" />
        <NavbarItem title="Contact" destination="/contact" />
      </div>

      {/* MIDDLE SECTION (LOGO) */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <Image
          src="/images/stamp1.png"
          alt="Logo"
          width={60}
          height={60}
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
        <NavbarItem title="Group Name" destination="/" />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex flex-col justify-center items-center space-y-2">
        <NavbarItem title="T.O.S" destination="/tos" />
        <NavbarItem title="Pricing" destination="/price" />
      </div>
    </div>
  );
}
