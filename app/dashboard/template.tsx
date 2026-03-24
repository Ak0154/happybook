"use client";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && (
                <div className="flex flex-col items-center justify-center min-h-[80vh] w-full animate-in fade-in duration-200">
                    <div className="flex items-center gap-4 text-foreground/80">
                        <Loader className="w-8 h-8 animate-[spin_1.5s_linear_infinite] text-foreground/70" />
                        <span className="text-2xl font-medium tracking-wide">Loading...</span>
                    </div>
                </div>
            )}
            <div className={isLoading ? "hidden" : "w-full h-full animate-in fade-in zoom-in-95 duration-500"}>
                {children}
            </div>
        </>
    );
}
