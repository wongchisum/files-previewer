## 附件预览弹窗用例

```tsx
import React, { useState } from 'react';
import { NextPDFPreviewer, PreviewPortal } from '@wongchisum/files-previewer';

const link =
  '/pdfApi/wojtekmaj/react-pdf/d2ee43b13abb98a11e23ba113a6ac0d108f24424/sample/create-react-app-5/public/sample.pdf';

export default () => {
  const [visible, setVisible] = useState(true);

  const handleToggleVisible = () => {
    console.log("trigger")
    setVisible(true);
  };

  console.log("visible",visible)

  return (
    <>
      <PreviewPortal visible={visible} onClose={handleToggleVisible}>
        <NextPDFPreviewer
          filename="张三李四张三李四张三李四.pdf"
          link={link}
        //   visible={visible}
        //   onClose={handleToggleVisible}
        />
      </PreviewPortal>
      <button onClick={handleToggleVisible}>打开预览</button>
    </>
    
  );
};
```
