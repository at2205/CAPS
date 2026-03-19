"use client";

import { useState } from "react";
import { menuItems } from "./menuData";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const [hoverMain, setHoverMain] = useState(null);
  const [hoverSub, setHoverSub] = useState(null);

  // Safe navigation handler
  const handleNavigation = (e, url) => {
    e.stopPropagation();

    if (!url || typeof url !== "string") {
      console.warn("⚠️ No URL found for this menu item");
      return;
    }

    router.push(url);
  };

  return (
    <aside className="w-64 capsColor text-white h-screen relative">

      {/* Logo */}
      <div className="bg-white flex items-center">
        <Image
          src="/FindiBankitLogoNew.jpg"
          alt="Organization Logo"
          width={150}
          height={60}
          className="h-14 w-[150px]"
        />
      </div>

      <ul className="space-y-1 p-2">

        {menuItems.map((main, mainIndex) => (
          <li
            key={mainIndex}
            className="relative"
            onMouseEnter={() => setHoverMain(mainIndex)}
            onMouseLeave={() => setHoverMain(null)}
          >

            {/* Main menu */}
            <div
              onClick={(e) => handleNavigation(e, main.url)}
              className={`px-3 py-1 rounded hover:bg-[#226b88] 
                ${main.url ? "cursor-pointer" : "cursor-default"}`}
            >
              {main.label}
            </div>

            {/* Submenu */}
            {main.children && hoverMain === mainIndex && (
              <ul className="absolute top-0 left-full bg-[#4fa2c2] min-w-[300px] shadow-lg z-20">

                {main.children.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative"
                    onMouseEnter={() => setHoverSub(subIndex)}
                    onMouseLeave={() => setHoverSub(null)}
                  >

                    {/* Sub item */}
                    <div
                      onClick={(e) => handleNavigation(e, sub.url)}
                      className={`px-3 py-1 rounded hover:bg-[#226b88] 
                        ${sub.url ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {sub.label}
                    </div>

                    {/* Third level menu */}
                    {sub.children && hoverSub === subIndex && (
                      <ul
                        className="absolute top-0 left-full bg-[#4fa2c2] 
                        min-w-[300px] shadow-lg z-30 
                        max-h-[130px] overflow-y-auto"
                      >
                        {sub.children.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            onClick={(e) =>
                              handleNavigation(e, item.url)
                            }
                            className={`px-3 py-1 rounded hover:bg-[#226b88] 
                              whitespace-nowrap 
                              ${item.url ? "cursor-pointer" : "cursor-default"}`}
                          >
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    )}

                  </li>
                ))}

              </ul>
            )}

          </li>
        ))}

      </ul>
    </aside>
  );
}
