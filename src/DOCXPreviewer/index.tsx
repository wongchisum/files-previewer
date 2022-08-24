import { useBlobUrl } from '../hooks/useBlobUrl';
import React, { useRef, useEffect } from 'react';
import type { PreviewerProps } from '../typing';
import * as docx from 'docx-preview';

// docx格式的附件预览
export default function DOCXPreviewer({ link }: PreviewerProps) {
  const { blob } = useBlobUrl(link);
  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (blob && containerRef.current) {
      docx.renderAsync(blob, containerRef.current, null, {
        ignoreFonts: true,
      });
    }
  }, [blob, containerRef]);
  if (!link) return null;
  return <div id="docx-container" ref={containerRef} />;
}
