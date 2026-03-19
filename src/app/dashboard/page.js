"use client";
import Image from "next/image";
import CapsCard from "../components/caps_card/CapsCard";

export default function DashboardHome() {

    const quickAccessItems = [
        {
            serviceName: "Agent - Profile Management",
            serviceUrl: "/service1",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/agent2.png",
        },
        {
            serviceName: "TXN Status - Channel",
            serviceUrl: "/service2",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/report1.png",
        },
        {
            serviceName: "User Search - Agent",
            serviceUrl: "/service3",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/report1.png",
        },
        {
            serviceName: "TXN Reports - Channel",
            serviceUrl: "/service4",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/activity.png",
        },
        {
            serviceName: "A/C Statement - Agent",
            serviceUrl: "/service5",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/controlPanel.png",
        },
        {
            serviceName: "DS - Profile Management",
            serviceUrl: "/service6",
            imageUrl: "https://portal.bankit.in:9090/CAPS/images/agent3.png",
        },
    ];

    return (
        <div className="p-1">
            <CapsCard
                title="Dashboard"
                description="Quick summary of system users"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-3 mt-4">
                {quickAccessItems.map((item, index) => (
                    <div
                        key={index}
                        className="group perspective-1000 hover:cursor-pointer"
                    >
                        <div
                            className="
                                relative
                                bg-white
                                rounded-lg
                                shadow-md
                                p-1
                                flex
                                justify-center
                                items-center
                                transform-gpu
                                transition-all
                                duration-500
                                ease-out
                                group-hover:scale-105
                                group-hover:-translate-y-3
                                group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
                            "
                        >
                            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl w-full">
                                <div className="flex justify-center">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.serviceName}
                                        width={120}
                                        height={120}
                                    />
                                </div>
                                <p className="text-[#226b88] text-sm text-center mt-2">
                                    {item.serviceName}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
