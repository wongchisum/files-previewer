import { useEffect, useState } from 'react';
// 请求url，转化为blob和附件的url
export function useBlobUrl(link: string) {
  const [url, setUrl] = useState<null | string>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    link &&
      fetch(link, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'no-cors',
      })
        .then((response) => {
          return response.blob();
        })
        .then((blobResponse) => {
          setBlob(blobResponse);
          const result = window.URL.createObjectURL(blobResponse);
          setUrl(result);
        });
  }, [link]);

  return {
    url,
    blob,
  };
}
