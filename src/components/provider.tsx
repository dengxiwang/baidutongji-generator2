"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Provider({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<HeroUIProvider navigate={router.push} className="h-full flex-1 flex flex-col">
			<ToastProvider
				placement="top-center"
				toastOffset={18}
				toastProps={{
					timeout: 2000,
					classNames: {
						content: "gap-3",
					},
				}}
			/>
			{children}
		</HeroUIProvider>
	);
}
