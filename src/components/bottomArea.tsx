"use client";
import { Divider, Link } from "@heroui/react";

export default function BottomArea() {
	return (
		<section className="min-h-16 mt-3 border-t border-black/15 px-6 py-3 flex font-semibold items-center">
			<div className="max-w-5xl h-full mx-auto flex flex-wrap-reverse w-full justify-between items-center gap-x-6 gap-y-3">
				<p className="opacity-40">© 百度统计插件版本生成器</p>
				<div className="flex items-center h-full gap-3 flex-wrap">
					<Link
						size="sm"
						href="https://gotab.cn"
						target="_blank"
						className="cursor-pointer"
					>
						🏠 &nbsp;主站链接
					</Link>
					<Divider orientation="vertical" className="h-[14px]" />
					<Link
						size="sm"
						href="https://www.rainyun.com/gotab_"
						target="_blank"
						className="cursor-pointer"
					>
						🔥 雨云服务器 - 高性价比云服务器
					</Link>
				</div>
			</div>
		</section>
	);
}
