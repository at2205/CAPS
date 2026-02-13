export default function PageCard({ title, children, className = "" }) {
    return (
        <div className="mt-1">
            <div
                className={`
                            bg-white
                            shadow-2xs
                            rounded-lg
                            p-5
                            border
                            border-gray-200
                            ${className}
                        `}
            >
                <div className="p-5 border border-[#226b88] rounded-md">
                    {title && (
                        <h1 className="text-lg font-semibold mb-2">
                            {title}
                        </h1>
                    )}

                    {children}
                </div>
            </div>
        </div>
    );
}
