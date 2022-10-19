import { useEffect, useState } from 'react';
import axios from 'axios';
// const headers = new Headers();
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Content-Type', 'application/json;charset=UTF-8');

// 请求url，转化为blob和附件的url
export function useBlobUrl(link: string) {
  const [url, setUrl] = useState<null | string>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleFetch = () => {
    axios(link,{responseType:"blob"}).then((response) => {
      setBlob(response.data)
      const result = window.URL.createObjectURL(response.data)
      setUrl(result)
    }).catch (error => {
      console.log('error', error)
    }) 
  }

  useEffect(() => {
    link && handleFetch()
    // link &&
    //   fetch(link, {
    //     mode: 'no-cors',
    //     headers: headers,
    //     credentials: 'include',
    //   })
    //     .then((response) => {
    //       return response.blob();
    //     })
    //     .then((blobResponse) => {
    //       setBlob(blobResponse);
    //       const result = window.URL.createObjectURL(blobResponse);
    //       setUrl(result);
    //     });
  }, [link]);

  return {
    url,
    blob,
  };
}
