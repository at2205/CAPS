import React from "react";

function Header() {
    return (
        <header className="h-14 bg-[#226b88] shadow px-4 text-white flex items-center">
            <div className="flex justify-between items-center w-full">

                {/* Left: Navigation */}
                <div className="flex gap-4">
                    <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
                        Home
                    </button>
                    <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
                        Change Password
                    </button>
                    <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
                        Back
                    </button>
                    <button className="font-semibold hover:bg-[#4fa2c2] px-3 py-1 rounded transition">
                        Logout
                    </button>
                </div>

                {/* Right: User Info */}
                <div className="flex items-center gap-6 text-sm">
                    <span>
                        <span className="opacity-80">User:</span>{" "}
                        <strong>bhoopendra singh</strong>
                    </span>

                    <span className="border-l border-white/30 pl-4">
                        <span className="opacity-80">ID:</span>{" "}
                        <strong>1010</strong>
                    </span>

                    <span className="border-l border-white/30 pl-4">
                        <span className="opacity-80">Balance:</span>{" "}
                        <strong>₹1,000</strong>
                    </span>
                </div>

            </div>
        </header>
    );
}

export default Header;
