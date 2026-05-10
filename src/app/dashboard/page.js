"use client";
import Image from "next/image";
import CapsCard from "../components/caps_card/CapsCard";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
    const router = useRouter();

    const quickAccessItems = [
        {
            serviceName: "Agent - Profile Management",
            serviceUrl: "/dashboard/control-panel/profile-management/retail-user",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/agent2.png",
        },
        {
            serviceName: "TXN Status - Channel",
            serviceUrl: "/dashboard/reports/cc-module/transaction-status",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/report1.png",
        },
        {
            serviceName: "User Search - Agent",
            serviceUrl: "/dashboard/da-module/user-search?type=agent",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/report1.png",
        },
        {
            serviceName: "TXN Reports - Channel",
            serviceUrl: "/dashboard/reports/transaction-reports/channel",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/activity.png",
        },
        {
            serviceName: "A/C Statement - Agent",
            serviceUrl: "/dashboard/reports/statements/channel",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/controlPanel.png",
        },
        {
            serviceName: "DS - Profile Management",
            serviceUrl: "/dashboard/control-panel/profile-management/retail-user",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/agent3.png",
        },
    ];

    return (
        <div className="px-4 sm:px-6 lg:px-10 py-3">
            <CapsCard
                title="Dashboard"
                description="Quick summary of system users"
            />

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 mt-4" >
                {quickAccessItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(item.serviceUrl)}
                        className="group cursor-pointer"
                    >
                        {/* Card */}
                        <div
                            className="
                                bg-white
                                rounded-lg
                                shadow-sm
                                p-3
                                flex
                                flex-col
                                justify-center
                                items-center
                                h-[140px]
                                border-2 border-[#d4eef6]
                                transition-all
                                duration-300
                                group-hover:scale-105
                                group-hover:-translate-y-1
                                group-hover:shadow-md
                            "
                        >
                            {/* Image */}
                            <Image
                                src={item.imageUrl}
                                alt={item.serviceName}
                                width={90}
                                height={80}
                                className="mb-8 object-contain"
                            />

                            {/* Text */}
                            <p className="text-[#226b88] text-sm text-center px-2 leading-snug font-medium tracking-wider">
                                {item.serviceName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}