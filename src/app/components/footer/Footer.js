import React from 'react'

function Footer() {
    return (
        <div className="h-12 bg-[#226b88] shadow flex items-center justify-center text-sm text-white">
            <div className="flex items-center gap-6 text-sm">

                {/* Phone */}
                <span>
                    <span className="opacity-80">Call Us:</span>{" "}
                    <a
                        href="tel:+918142600000"
                        className="font-semibold hover:underline"
                    >
                        8142600000
                    </a>
                </span>

                {/* Email */}
                <span className="border-l border-white/30 pl-4">
                    <span className="opacity-80">Write Us:</span>{" "}
                    <a
                        href="mailto:support@bankit.in"
                        className="font-semibold hover:underline"
                    >
                        support@bankit.in
                    </a>
                </span>

                {/* Copyright */}
                <span className="border-l border-white/30 pl-4 opacity-80">
                    © {new Date().getFullYear()}
                </span>

            </div>
        </div>
    )
}

export default Footer
