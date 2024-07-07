import LinkNext from "next/link";
import React from "react";

import { cn } from "../utils";

type Props = { href: string; className?: string; children: React.ReactNode };

export const Link = (props: Props) => {
  const { href, className, children } = props;

  return (
    <LinkNext href={href} className={cn("hover:underline", className)}>
      {children}
    </LinkNext>
  );
};
