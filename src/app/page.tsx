"use client";
import {
	Button,
	Code,
	Link,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Snippet,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLink } from "react-icons/ai";
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
		<div className="flex flex-col h-full">
			<div className="flex-1 flex flex-col h-full overflow-scroll">
				<div className="flex items-center justify-between border-b bg-gray-800 text-white p-3 flex-wrap font-semibold gap-x-3 gap-y-1 text-base">
					<div className="flex gap-x-1 items-center">
						<img src="/logo.svg" className="bg-transparent w-[24px] h-[24px]" />
						<div>百度统计插件生成器</div>
					</div>
					<Link
						className="gap-1 mx-3 text-white"
						size="sm"
						href="https://tongji.baidu.com/"
						target="_blank"
					>
						<AiOutlineLink /> 前往百度统计
					</Link>
				</div>
				<div className="flex-1 flex flex-col h-max w-full max-w-5xl m-auto p-6 pb-12">
					<div className="flex gap-6 flex-col items-center w-full">
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
							startContent={<IoMdGitPullRequest />}
							onClick={generateCode}
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
								<p>
									3、在chrome-extension中需要在manifest.json中添加以下配置：
								</p>
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
								<div className="w-full flex flex-col items-center gap-1 mt-3">
									<Image src={"/wx.jpg"} alt="" width={150} height={150} />
									<p className="font-semibold">欢迎关注公众号，了解更多</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-0 z-50 p-3 w-full flex justify-center border-t bg-white flex-wrap font-semibold gap-x-3">
				<iframe
					src="https://ghbtns.com/github-btn.html?user=dengxiwang&repo=baidutongji-generator2&type=star&count=false"
					width="52.5px"
					height="21px"
					className="border-none overflow-hidden"
				/>
				<p>
					本服务由
					<Link size="sm" href="https://gotab.cn">
						©gotab.cn
					</Link>
					提供
				</p>
				<p>💼 业务联系：dengxiwang@aliyun.com</p>
			</div>
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
