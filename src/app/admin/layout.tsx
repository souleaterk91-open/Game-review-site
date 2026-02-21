import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import "@/styles/pages.css";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // @ts-ignore
    if (!session || session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="container" style={{ paddingTop: "100px", minHeight: "100vh", display: "flex", gap: "32px" }}>
            {/* Admin Sidebar */}
            <aside style={{ width: "250px", flexShrink: 0 }}>
                <div className="glass-panel" style={{ padding: "24px", borderRadius: "16px", position: "sticky", top: "100px" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                        Admin Panel
                    </h2>
                    <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Link href="/admin" className="btn-outline" style={{ justifyContent: "flex-start", border: "none" }}>
                            Dashboard
                        </Link>
                        <Link href="/admin/add-game" className="btn-outline" style={{ justifyContent: "flex-start", border: "none" }}>
                            + Add New Game
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Admin Main Content */}
            <main style={{ flexGrow: 1 }}>
                <div className="glass-panel" style={{ padding: "32px", borderRadius: "16px" }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
