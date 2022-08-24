// 适用于当附件请求无法发送成功（如：跨域），则以新Tab方式打开附件并预览
export function openTab(url: string) {
  window.open(url, '_blank');
}
