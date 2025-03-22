import { addToast, closeAll, ToastProps } from "@heroui/react";

export const toast = {
	success: function (options: string | ToastProps) {
		closeAll();
		if (typeof options === "string") {
			addToast({
				title: options,
				color: "success",
			});
		} else {
			addToast({ ...options, color: "success" });
		}
	},
	error: function (options: string | ToastProps) {
		closeAll();
		if (typeof options === "string") {
			addToast({
				title: options,
				color: "danger",
			});
		} else {
			addToast({ ...options, color: "danger" });
		}
	},
	warning: function (options: string | ToastProps) {
		closeAll();
		if (typeof options === "string") {
			addToast({
				title: options,
				color: "warning",
			});
		} else {
			addToast({ ...options, color: "warning" });
		}
	},
	info: function (options: string | ToastProps) {
		closeAll();
		if (typeof options === "string") {
			addToast({
				title: options,
				color: "primary",
			});
		} else {
			addToast({ ...options, color: "primary" });
		}
	},
	default: function (options: string | ToastProps) {
		closeAll();
		if (typeof options === "string") {
			addToast({
				title: options,
				color: "default",
			});
		} else {
			addToast({ ...options, color: "default" });
		}
	},
};
