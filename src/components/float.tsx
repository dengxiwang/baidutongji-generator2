import { Button } from "@heroui/react";
import Link from "next/link";
import { RiBaiduFill } from "react-icons/ri";

export default function Float() {
	return (
		<main className="block max-sm:hidden fixed right-0 top-1/2 -translate-y-1/2">
			<Link href="https://tongji.baidu.com/" target="_blank">
				<Button
					color="primary"
					className="rounded-r-none border-r-0 flex flex-col h-full gap-1 p-3 min-w-fit"
				>
					<RiBaiduFill size={20} />
					<span className="w-5 break-words text-wrap font-medium">
						百度统计官网
					</span>
				</Button>
			</Link>
		</main>
	);
}
