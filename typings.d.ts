import { valueFormatter } from 'react-data-grid';

declare module '*.css';
declare module '*.less';
declare module '*.png' {
  const value: string;
  export default valueFormatter;
}
