import { Suspense } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className=" hidden lg:block">
                <Sidebar />
            </aside>
            {/* Right Section */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <header>
                    <Header />
                </header>

                {/* Main Content */}
                <main className="flex-1 bg-[#def6ff] p-4 overflow-auto">
                    <Suspense>
                        {children}
                    </Suspense>
                </main>

                {/* Footer */}
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
