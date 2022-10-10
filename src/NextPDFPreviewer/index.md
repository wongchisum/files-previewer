## PDF 用例

```tsx
import React, { useState } from 'react';
import { NextPDFPreviewer } from '@wongchisum/files-previewer';

const link =
  '/pdfApi/wojtekmaj/react-pdf/d2ee43b13abb98a11e23ba113a6ac0d108f24424/sample/create-react-app-5/public/sample.pdf';

export default () => {
  const [visible, setVisible] = useState(true);

  const handleToggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <NextPDFPreviewer
        filename="张三李四张三李四张三李四.pdf"
        link={link}
        visible={visible}
        onClose={handleToggleVisible}
      />
    </>
  );
};
```
