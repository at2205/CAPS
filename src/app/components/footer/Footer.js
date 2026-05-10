import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#4fa2c2] via-[#4fa2c2] to-[#4fa2c2] 
    text-white backdrop-blur-md border-t border-white/20 shadow-inner">

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 
      text-xs sm:text-sm py-3 px-3 text-center">

        {/* Phone */}
        <span className="flex items-center gap-1">
          <span className="opacity-80">Call Us: 📞</span>
          <a
            href="tel:+918142600000"
            className="font-semibold text-yellow-200 hover:text-white hover:underline transition"
          >
            8142600000
          </a>
        </span>

        {/* Divider */}
        <span className="hidden sm:block h-4 w-px bg-white/30"></span>

        {/* Email */}
        <span className="flex items-center gap-1">
          <span className="opacity-80">Write Us: ✍️</span>
          <a
            href="mailto:support@bankit.in"
            className="font-semibold text-yellow-200 hover:text-white hover:underline transition"
          >
            support@bankit.in
          </a>
        </span>

        {/* Divider */}
        <span className="hidden sm:block h-4 w-px bg-white/30"></span>

        {/* Copyright */}
        <span className="opacity-80">
          © {new Date().getFullYear()} FINDIBANKIT
        </span>

      </div>
    </footer>
  );
}

export default Footer;