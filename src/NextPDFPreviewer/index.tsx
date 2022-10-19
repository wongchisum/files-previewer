/*
 * @Author: wangzhisen
 * @Date: 2022-09-22 11:57:10
 * @Last Modified by: wangzhisen
 * @Last Modified time: 2022-09-22 15:44:24
 */
import React from 'react';
import type { ReactElement } from 'react';
import './index.less';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import type { ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';
import type { PDFPreviewerProps } from '../typing';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PrinterOutlined,
  DownloadOutlined,
  FullscreenOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
// 样式
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { LocalizationMap } from '@react-pdf-viewer/core';

// 创建插件示例
// const defaultLayoutPluginInstance = defaultLayoutPlugin();
// 多语言
import zh from '@react-pdf-viewer/locales/lib/zh_CN.json';

type ToolBarType = (props: ToolbarProps) => ReactElement;

// 定制化UI工具栏
const renderToolbar = (Toolbar: ToolBarType, filename?: string, onClose?: () => void) => (
  <>
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          ZoomOut,
          ZoomIn,
          Zoom,
          GoToPreviousPage,
          GoToNextPage,
          Print,
          Download,
          Rotate,
          CurrentPageLabel,
          EnterFullScreen,
          NumberOfPages,
        } = slots;

        return (
          <div className={'toolbar'}>
            <div className={'container'}>
              {filename && (
                <div className={'fileInfo'}>
                  <span className={'filename'} title={filename}>
                    {filename.replace(/\.pdf$/, '')}
                  </span>
                  <span className={'suffix'}>.pdf</span>
                </div>
              )}

              <div className={'pageInfo'}>
                <div>
                  <span>第</span>
                  <CurrentPageLabel />页<span> / </span>
                  <span>共</span>
                  <NumberOfPages />页
                </div>
              </div>
              <EnterFullScreen>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <FullscreenOutlined />
                    <span>全屏</span>
                  </div>
                )}
              </EnterFullScreen>
              <ZoomOut>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <ZoomOutOutlined />
                    <span>缩小</span>
                  </div>
                )}
              </ZoomOut>
              <ZoomIn>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <ZoomInOutlined />
                    <span>放大</span>
                  </div>
                )}
              </ZoomIn>

              <GoToPreviousPage>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <ArrowLeftOutlined onClick={props.onClick} />
                    <span>上一页</span>
                  </div>
                )}
              </GoToPreviousPage>

              <GoToNextPage>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <ArrowRightOutlined />
                    <span>下一页</span>
                  </div>
                )}
              </GoToNextPage>

              <Print>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <PrinterOutlined />
                    <span>打印</span>
                  </div>
                )}
              </Print>

              <Download>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <DownloadOutlined />
                    <span>下载</span>
                  </div>
                )}
              </Download>
              <Rotate direction={'Forward' as any}>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <RotateRightOutlined />
                    <span>顺时针旋转</span>
                  </div>
                )}
              </Rotate>
              <Rotate direction={'Backward' as any}>
                {(props) => (
                  <div className={'icon'} onClick={props.onClick}>
                    <RotateLeftOutlined />
                    <span>逆时针旋转</span>
                  </div>
                )}
              </Rotate>
              <div className={'zoom'}>
                <Zoom />
              </div>
            </div>
            <div>
              <CloseOutlined className={'close'} onClick={() => onClose?.()} />
            </div>
          </div>
        );
      }}
    </Toolbar>
  </>
);

export default function NextPDFPreviewer(props: PDFPreviewerProps) {
  const { filename, link, visible, onClose } = props;
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (...toolbarProps) => renderToolbar(...toolbarProps, filename, onClose),
  });

  return (
    <div className={'wrapper'}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
        {visible && (
          <Viewer
            defaultScale={1}
            localization={zh as LocalizationMap}
            fileUrl={link}
            plugins={[defaultLayoutPluginInstance]}
          />
        )}
      </Worker>
    </div>
  );
}
