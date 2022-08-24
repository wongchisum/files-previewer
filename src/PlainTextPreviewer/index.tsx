import React, { useEffect, useState } from 'react';
import { useBlobUrl } from '../hooks/useBlobUrl';
import { PreviewerProps } from '../typing';
import './index.less';

export default function PlainTextPreviewer({ link }: PreviewerProps) {
  const { blob } = useBlobUrl(link);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (blob) {
      blob
        .text()
        .then((result) => setText(result))
        .catch((reason) => {
          setError(reason?.message ?? '解析失败，请重试！');
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
