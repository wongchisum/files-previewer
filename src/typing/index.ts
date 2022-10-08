export type PreviewerProps = {
  link: string;
};

export type PDFPreviewerProps = PreviewerProps & {
  filename?: string; // 附件名称
  visible?: boolean; // 是否显示附件预览
  onClose?: () => void; // 关闭预览的回调函数
};
