import React, { useEffect, useState } from 'react';
import { useBlobUrl } from '../hooks/useBlobUrl';
import { PreviewerProps } from '../typing';
import './index.less';
import detect from 'detect-file-encoding-and-language';

export default function PlainTextPreviewer({ link }: PreviewerProps) {
  const { blob } = useBlobUrl(link);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  function handleUpdateText(encodeType: string) {
    const read = new FileReader();
    read.readAsText(blob as Blob, encodeType);
    read.onload = function (event) {
      setText(event?.target?.result as string);
      setLoading(false);
    };
    read.onerror = function () {
      setError('文本解析失败');
      setLoading(false);
    };
  }

  function handleParseText() {
    if (blob) {
      setLoading(true);
      setError(null);
      const file = new File([blob], 'default.txt');
      detect(file)
        .then((result) => {
          const encodeType = result?.encoding ?? 'utf-8';
          handleUpdateText(encodeType);
        })
        .catch(() => {
          // 无法得知编码类型，默认使用utf-8
          handleUpdateText('utf-8');
        });
    }
  }

  useEffect(() => {
    handleParseText();
  }, [blob]);

  if (loading) {
    return <div>正在解析中...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (text) {
    return (
      <div className="text-wrap">
        <div className="text-inner">
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }
}
