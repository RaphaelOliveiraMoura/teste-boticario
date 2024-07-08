import Image from "next/image";
import React from "react";

import { Link } from "@/ui/components/link";
import { Pages } from "@/ui/pages";
import { Separator } from "@/ui/shadcn/separator";

export default function Template({ children }: { children: React.ReactNode }) {
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
          <ul className="mt-4 flex gap-4">
            {[
              { href: Pages.ListProducts(), name: "Produtos" },
              { href: Pages.ListCategories(), name: "Categorias" },
              { href: Pages.ListClients(), name: "Clientes" },
              { href: Pages.ListOrders(), name: "Pedidos" },
            ].map((item) => (
              <li key={item.name}>
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
