import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@wongchisum/files-previewer',
  logo: 'https://www.xmfunny.com/img/bannel-games-i.png',
  outputPath: 'docs-dist',
  proxy: {
    '/docApi': {
      target: 'https://zsb.sjtu.edu.cn/OpenFile/',
      changeOrigin: true,
      pathRewrite: { '^/docApi': '' },
    },
    '/pdfApi': {
      target: 'https://raw.githubusercontent.com/',
      changeOrigin: true,
      pathRewrite: { '^/pdfApi': '' },
    },
    '/nextPDFApi': {
      target: 'https://www.chp.gov.hk/',
      changeOrigin: true,
      pathRewrite: { '^/nextPDFApi': '' },
    },
    '/textApi': {
      target: 'http://txt.bookshuku.com/',
      changeOrigin: true,
      pathRewrite: { '^/textApi': '' },
    },
    '/excelApi': {
      target: 'http://jyj.wuhai.gov.cn/',
      changeOrigin: true,
      pathRewrite: { '^/excelApi': '' },
    },
  },
});
