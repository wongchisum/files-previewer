import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { pdfjs } from 'react-pdf';
import './index.less';
import type { PreviewerProps } from '../typing';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useBlobUrl } from '../hooks/useBlobUrl';
import { openTab } from '../utils';

// pdf格式的附件预览
export default function PDFPreviewer({ link }: PreviewerProps) {
  const [numPages, setNumPages] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { url } = useBlobUrl(link);
  function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number }) {
    setNumPages(nextNumPages);
  }

  if (!url) return null;
  return (
    <div className="Example">
      <div className="Example__container__document">
        <Document
          file={url}
          renderMode="svg"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => openTab(url)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div style={{ display: index + 1 === currentPage ? 'unset' : 'none' }}>
              <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={1.5} />
            </div>
          ))}
          <div className="pagination">
            <button
              onClick={() => {
                setCurrentPage((page) => page - 1);
              }}
              disabled={currentPage === 1}
            >
              上一页
            </button>
            <span>{`${currentPage} / ${numPages}`}</span>
            <button
              onClick={() => {
                setCurrentPage((page) => page + 1);
              }}
              disabled={currentPage === numPages}
            >
              下一页
            </button>
          </div>
        </Document>
      </div>
    </div>
  );
}
