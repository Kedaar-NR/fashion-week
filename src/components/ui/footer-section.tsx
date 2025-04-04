
"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footerdemo() {
  return (
    <footer className="relative z-10 w-full bg-white border-t py-6 mt-4">
      <div className="container mx-auto max-w-7xl px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500">
              © 2025 Fashion Week. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <a
              href="mailto:info@fashionweek.com"
              className="text-xs text-gray-500 hover:underline"
            >
              info@fashionweek.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
