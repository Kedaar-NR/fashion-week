
"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Footer } from "@/components/ui/footer";

export function Footerdemo() {
  return (
    <div className="w-full">
      <Footer
        logo={<span className="text-lg font-semibold">FW</span>}
        brandName="Fashion Week"
        socialLinks={[
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "#",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "#",
            label: "Instagram",
          },
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "#",
            label: "Twitter",
          },
        ]}
        mainLinks={[
          { href: "/", label: "Home" },
          { href: "/brands", label: "Brands" },
          { href: "/liked", label: "Favorites" },
        ]}
        legalLinks={[
          { href: "#", label: "Privacy" },
          { href: "#", label: "Terms" },
        ]}
        copyright={{
          text: "© 2025 Fashion Week",
          license: "All rights reserved",
        }}
      />
    </div>
  );
}
