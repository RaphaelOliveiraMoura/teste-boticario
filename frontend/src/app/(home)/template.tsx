"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import { Link } from "@/ui/components/link";
import { Pages } from "@/ui/pages";
import { Separator } from "@/ui/shadcn/separator";
import { cn } from "@/ui/utils";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <header className="container flex items-center gap-10 py-6">
        <Image
          src="/logo.png"
          width={200}
          height={100}
          alt="Logo da Boticário"
        />
        <nav>
          <ul className="mt-4 flex gap-8">
            {[
              { href: Pages.ListProducts(), name: "Produtos" },
              { href: Pages.ListCategories(), name: "Categorias" },
              { href: Pages.ListClients(), name: "Clientes" },
              { href: Pages.ListOrders(), name: "Pedidos" },
            ].map((item) => (
              <li
                key={item.name}
                className={cn(pathname.includes(item.href) && "font-bold")}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <Separator className="mb-6" />
      <main className="container">{children}</main>
    </div>
  );
}
