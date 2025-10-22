import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ w, h }: { w?: number; h?: number }) => {
  return (
    <Link href={"/"}>
      <Image
        src={"/Logocypher.png"}
        width={w ?? 50}
        height={h ?? 30}
        alt="Cypher Studio"
      />
    </Link>
  );
};

export default Logo;
