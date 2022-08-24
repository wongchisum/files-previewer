# @wongchisum/files-previewer

实现附件链接的在线预览

目前支持格式:Pdf(.pdf)/Excel(.xlsx)/PlainText(.txt)/Word(.docx)

## 起步

安装依赖

```bash
$ npm i @sofunny/files-previewer
```

## 使用示例

PDF:

```tsx
import React from 'react';
import { PDFPreviewer } from '@wongchisum/files-previewer';

const link =
  '/pdfApi/wojtekmaj/react-pdf/d2ee43b13abb98a11e23ba113a6ac0d108f24424/sample/create-react-app-5/public/sample.pdf';

export default () => <PDFPreviewer link={link} />;
```

TXT:

```tsx
import React from 'react';
import { PlainTextPreviewer } from '@wongchisum/files-previewer';

const link = '/textApi/home/down/txt/id/31878';

export default () => <PlainTextPreviewer link={link} />;
```


DOCX:

```tsx
import React from 'react';
import { DOCXPreviewer } from '@wongchisum/files-previewer';

const link =
  '/docApi/OpenFile2.aspx?Url=/Upload/Content/381/Attach/636504885264821434_2_22369.docx';

export default () => <DOCXPreviewer link={link} />;
```

EXCEL:

```tsx
import React from 'react';
import { XLSXPreviewer } from '@wongchisum/files-previewer';

const link = '/excelApi/jyj/260491/260514/1079243/2021072118161979607.xls';

export default () => <XLSXPreviewer link={link} />;
```

---

## 开发

安装依赖

```bash
$ npm install
```

启动服务

```bash
$ npm start
```

构建文档

```bash
$ npm docs:build
```

启动单元测试

```bash
$ npm run test
```

构建代码

```bash
$ npm run build
```

---

## 注意事项：

前端访问附件的链接，需要确保已经解决跨域问题

比如：假设某个附件的链接是 a.com/assets/xxx.pdf

那么开发环境可以在 proxy 配置

```
'/docApi': {
      target: 'a.com/',
      changeOrigin: true,
      pathRewrite: { '^/docApi': '' },
    },
```
并将你的链接地址改写为 /docApi/assets/xxx.pdf

开发环境可以通过Nginx进行配置，如:

```
 location /docApi/ {
        rewrite /docApi/(.*) /$1  break;
        proxy_pass https://s.com;
        proxy_set_header Host $proxy_host;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }


```

---

## 缺陷

- [ ] PDF缺陷： 目前禁用文字选中，因为使用的依赖react-pdf的文字选中区域有缺陷

- [ ] Word缺陷： 目前Word文档的预览没有分页，因为使用的依赖docx-preview不支持