import { PropsWithChildren } from 'react';

export type PreviewerProps = {
  link: string;
};

export type PDFPreviewerProps = PreviewerProps & {
  filename?: string; // 附件名称
  visible?: boolean; // 是否显示附件预览
  onClose?: () => void; // 关闭预览的回调函数
};

export type PreviewerPortalProps = PropsWithChildren<{
  /**是否显示附件预览 */
  visible: boolean;
  /**关闭附件预览的回调事件 */
  onClose: () => void;
}>;
