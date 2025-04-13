"use client";
import BottomArea from "@/components/bottomArea";
import Float from "@/components/float";
import { toast } from "@/components/toast";
import {
    Alert,
    Button,
    Code,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Snippet,
    Textarea,
    useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { IoMdGitPullRequest } from "react-icons/io";
import { TiExport } from "react-icons/ti";

export default function Home() {
	const [code, setCode] = useState<string>("");
	const [getResult, setGetResult] = useState<string>("");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const generateCode = async () => {
		if (!code || !code.trim()) {
			toast.error("请输入百度统计获取到的统计代码");
		} else {
			const src = code.match(
				/\b(([\w-]+:\/\/?| www[.])[^\s()<>]+(?:[\w\d]+|([^[:punct:]\s]|\/)))/gi
			);
			if (src) {
				const url = src[0];
				window.open(
					url,
					"_blank",
					"width=600,height=600,menubar=no,toolbar=yes, status=no,scrollbars=yes"
				);
				onOpen();
			} else {
				toast.error("未能解析到插件地址");
			}
		}
	};

	function downloadJs() {
		if (!getResult || !getResult.trim()) {
			toast.error("请输入弹窗加载的插件代码");
		} else {
			let href = "window.location.href.split('/').slice(-1)[0]";
			const re = /dm:\[(.*?)\]/g;
			const match = re.exec(getResult);
			if (!match || !match[1]) {
				toast.error("未能发现统计插件代码中的有效地址，请检查输入内容是否正确");
				return;
			}

			const host = match[1].split(",")[0];
			if (!host) {
				toast.error("未能发现统计插件代码中的有效地址，请检查输入内容是否正确");
				return;
			}

			const data = getResult
				.replace(/document.location.hostname/g, `${host}`) // file和chrome-extension等协议不存在document.location.hostname,直接使用新增网站时的网站域名来替代
				.replace(/window.location.host|document.location.host/g, `${host}`) // file和chrome-extension等协议不存在document.location.host,直接使用新增网站时的网站域名来替代
				.replace(
					/window.location.href|document.location.href/g,
					`"https://${host.replace(/"/gi, "")}/" + ` + href
				) // file和chrome-extension等协议的访问路径过长，直接使用url中最后的一个字符"/"后面的路径替换
				.replace("/https?:/.test(document.location.protocol)", `true`);

			const blob = new Blob([data], { type: "application/javascript" });
			const url = URL.createObjectURL(blob);

			// 创建一个隐藏的可点击的链接
			const link = document.createElement("a");
			link.href = url;
			link.download = "hm.js";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// 清理
			URL.revokeObjectURL(url);
		}
	}

	return (
		<div className="flex flex-col h-full flex-1">
			<Float />
			<div className="flex-1 flex flex-col h-max w-full max-w-5xl m-auto p-6">
				<Alert
					className="font-medium"
					style={{
						flex: 0,
					}}
					hideIcon
					color="primary"
					title="本工具用于辅助生成百度统计插件在file和chrome-extension等协议环境下【如：electron、chrome extension】能正常上报统计信息的本地插件文件。"
				/>
				<div className="flex gap-6 flex-col items-center w-full mt-4">
					<Textarea
						variant="underlined"
						label="百度统计代码（从百度统计管理中获取）"
						isRequired
						rows={11}
						disableAutosize
						placeholder={`请将您在百度统计管理后台中获取到的代码粘贴在下方后，点击生成即可。
代码示例如下：
<script>
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?85cc3e80cb956183bd917f7d32803b02";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
</script>
`}
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<Button
						variant="solid"
						color="primary"
						className="font-medium"
						startContent={<IoMdGitPullRequest />}
						onPress={generateCode}
					>
						获取百度插件代码
					</Button>
					<div className="w-full">
						<p className="font-semibold mb-3 text-lg">【如何使用】</p>
						<div className="flex flex-col gap-3 font-semibold">
							<p>1、将下载到的hm.js文件放置在公共目录，如：/public/hm.js</p>
							<p>2、在index.html的head标签中添加：</p>
							<Snippet
								className="*:flex *:items-center *:gap-3"
								tooltipProps={{
									content: "点击复制",
									color: "foreground",
								}}
								symbol=""
								onCopy={() => {
									toast.success("复制成功");
								}}
							>
								<p className="whitespace-pre-wrap">{`<script type="text/javascript" src="hm.js"></script>`}</p>
							</Snippet>
							<p>3、在chrome-extension中需要在manifest.json中添加以下配置：</p>
							<Snippet
								className="*:flex *:items-center *:gap-3"
								tooltipProps={{
									content: "点击复制",
									color: "foreground",
								}}
								symbol=""
								onCopy={() => {
									toast.success("复制成功");
								}}
							>
								<p className="whitespace-pre-wrap">{`"content_security_policy": "script-src 'self' 'unsafe-eval' https://hmcdn.baidu.com; object-src 'self'"`}</p>
							</Snippet>
							<div className="w-full flex flex-col items-center gap-1 mt-6">
								<div className="w-[150px] h-[150px] bg-gray-200 rounded-xl flex items-center justify-center">
									<div className="rounded-lg bg-gray-100">
										<Image
											src={"/wx.jpg"}
											alt=""
											width={140}
											height={140}
											className="rounded-lg"
										/>
									</div>
								</div>
								<p className="font-semibold mt-3">
									欢迎扫码关注：GOTAB百宝箱，发现更多精彩
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<BottomArea />
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={() => {
					setGetResult("");
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								最后一步
							</ModalHeader>
							<ModalBody className="-mt-3 py-0 gap-0">
								<Code
									className="whitespace-pre-wrap text-xs font-semibold"
									color="primary"
								>
									请将弹窗中的代码内容粘贴在下方，以便导出hm.js文件
								</Code>
								<Textarea
									variant="underlined"
									label="百度统计插件代码"
									isRequired
									rows={11}
									disableAutosize
									value={getResult}
									onChange={(e) => setGetResult(e.target.value)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button variant="bordered" onPress={onClose}>
									关闭弹窗
								</Button>
								<Button color="primary" onPress={downloadJs}>
									<TiExport />
									导出文件
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
