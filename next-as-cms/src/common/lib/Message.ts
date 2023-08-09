import { Modal } from "antd";

export function confirm(confirmMsg="确认操作吗？") {
  Modal.confirm({
    title: confirmMsg,
    content: "Some descriptions",
    okText: "确定",
    okType: "danger",
    cancelText: "取消",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
