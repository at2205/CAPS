export default function CapsCard({
    title,
    description,
    footer,
    actions,
    children,
    className = "",
}) {
    return (
        <div className={` bg-white shadow-2xs rounded-lg p-4 border-2 border-[#4fa2c2] ${className}`}>
            {/* Header */}
            {(title || actions) && (
                <div className="flex items-start justify-between  bg-gradient-to-r from-[#2c5364] via-[#4fa2c2] to-[#4fa2c2] text-white mb-3 rounded-lg px-5 py-2">
                    <div>
                        {title && <h2 className="text-lg font-semibold">{title}</h2>}
                        {description && <p className="text-sm">{description}</p>}
                    </div>
                    {actions && <div className="ml-2">{actions}</div>}
                </div>
            )}

            {/* Body */}
            <div>
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="pt-3 mt-3 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
}
