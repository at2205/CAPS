"use client";

import { useState, useMemo } from "react";
import { menuItems } from "./menuData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { hasPermission, isSuperAdmin, isPgTbUser, isKycAuthorized } from "@/utilities/permissions";

// Filter menu items based on user permissions (mirrors header.jsp behavior)
function filterMenu(items) {
  if (!items) return [];
  return items.filter((item) => {
    // No permKey = always visible
    if (!item.permKey) return true;
    // Superadmin sees everything
    if (isSuperAdmin()) return true;
    // Special composite checks
    if (item.permKey === "pgTb") return isPgTbUser() && hasPermission("pgTb");
    if (item.permKey === "kycManagement") return isKycAuthorized();
    // Standard permission check
    return hasPermission(item.permKey);
  }).map((item) => ({
    ...item,
    children: item.children ? filterMenu(item.children) : undefined,
  })).filter((item) => !item.children || item.children.length > 0);
}

export default function Sidebar() {
  const router = useRouter();

  const [hoverMain, setHoverMain] = useState(null);
  const [hoverSub, setHoverSub] = useState(null);

  const visibleMenu = useMemo(() => filterMenu(menuItems), []);

  const handleNavigation = (e, url) => {
    e.stopPropagation();

    if (!url || typeof url !== "string") {
      console.warn("⚠️ No URL found for this menu item");
      return;
    }

    router.push(url);
  };

  return (
    <aside
      className="
      w-64 min-h-screen relative shadow-xl
      bg-gradient-to-b from-[#2c5364] via-[#4fa2c2] to-[#4fa2c2]
      text-white
    "
    >
      <ul className="space-y-2 p-3">
        <li className="h-14 border-b border-white/20 flex items-center justify-center">
    <Image
      src="/FindiBankitLogoNew.jpg"
      alt="logo"
      width={60}
      height={60}
      className="h-10 w-auto object-contain cursor-pointer 
      rounded-md mb-2 hover:scale-105 transition"
      onClick={() => router.push("/dashboard")}
    />
  </li>

        {/* ✅ MENU ITEMS (filtered by permissions) */}
        {visibleMenu.map((main, mainIndex) => (
          <li
            key={mainIndex}
            className="relative"
            onMouseEnter={() => setHoverMain(mainIndex)}
            onMouseLeave={() => setHoverMain(null)}
          >
            {/* MAIN MENU */}
            <div
              onClick={(e) => handleNavigation(e, main.url)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300
              hover:bg-white/20 hover:pl-6
              hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
              ${main.url ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex items-center gap-2 group w-full">
                <span className="w-1 h-4 bg-white rounded opacity-0 group-hover:opacity-100 transition"></span>
                <span className="tracking-wide">{main.label}</span>
              </div>
            </div>

            {/* SUBMENU */}
            {main.children && hoverMain === mainIndex && (
              <ul
                className="
                absolute top-0 left-full
                bg-gradient-to-b from-[#2c5364] via-[#4fa2c2] to-[#6dd5fa]
                backdrop-blur-md
                min-w-[200px]
                shadow-xl
                border border-white/20
                rounded-md
                z-20
              "
              >
                {main.children.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="relative"
                    onMouseEnter={() => setHoverSub(subIndex)}
                    onMouseLeave={() => setHoverSub(null)}
                  >
                    {/* SUB ITEM */}
                    <div
                      onClick={(e) => handleNavigation(e, sub.url)}
                      className={`px-4 py-2 text-sm rounded-md transition-all duration-200
                      hover:bg-white/20 hover:pl-5
                      hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
                      ${sub.url ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {sub.label}
                    </div>

                    {/* THIRD LEVEL */}
                    {sub.children && hoverSub === subIndex && (
                      <ul
                        className="
                        absolute top-0 left-full
                        bg-gradient-to-b from-[#2c5364] via-[#4fa2c2] to-[#6dd5fa]
                        backdrop-blur-md
                        min-w-[200px]
                        shadow-xl
                        border border-white/20
                        rounded-md
                        max-h-[150px]
                        overflow-y-auto
                        z-30
                      "
                      >
                        {sub.children.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            onClick={(e) => handleNavigation(e, item.url)}
                            className={`px-4 py-2 text-sm rounded-md transition-all duration-200
                            hover:bg-white/20 hover:pl-5
                            hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]
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
