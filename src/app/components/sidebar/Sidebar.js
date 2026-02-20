"use client";
import { useState } from "react";
import { menuItems } from "./menuData";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [hoverMain, setHoverMain] = useState(null);
  const [hoverSub, setHoverSub] = useState(null);

  const handleNavigation = (url) => {
    router.push(url);
  };

  return (
    <aside className="w-64 capsColor text-white h-screen relative">
      {/* organization logo */}
      <div className=" bg-white flex items-center justify-left">
        <div className="">
          <Image
            src="/FindiBankitLogoNew.jpg"
            alt="Organization Logo"
            width={100}
            height={100}
            className="h-14 w-[150px]"
          />
        </div>
      </div>
      <ul className="space-y-1 p-2">
        {menuItems.map((main, mainIndex) => (
          <li
            key={mainIndex}
            className="relative"
            onMouseEnter={() => setHoverMain(mainIndex)}
            onMouseLeave={() => setHoverMain(null)}
          >
            <div
              className="px-3 py-1 rounded hover:bg-[#226b88] cursor-pointer"
              onClick={() => handleNavigation(main.url)}
            >
              {main.label}
            </div>

            {main.children && hoverMain === mainIndex && (
              <ul className="absolute top-0 left-full bg-[#4fa2c2] min-w-[300px] shadow-lg z-20">
                {main.children.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative"
                    onMouseEnter={() => setHoverSub(subIndex)}
                    onMouseLeave={() => setHoverSub(null)}
                  >
                    <div
                      className="px-3 py-1 rounded hover:bg-[#226b88] cursor-pointer"
                      onClick={() => handleNavigation(sub.url)}
                    >
                      {sub.label}
                    </div>

                    {sub.children && hoverSub === subIndex && (
                      <ul
                        className="absolute top-0 left-full bg-[#4fa2c2] min-w-[300px] shadow-lg z-30
                                                   max-h-[130px] overflow-y-auto"
                      >
                        {sub.children.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="px-3 py-1 rounded hover:bg-[#226b88] cursor-pointer whitespace-nowrap"
                            onClick={() => handleNavigation(item.url)}
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
