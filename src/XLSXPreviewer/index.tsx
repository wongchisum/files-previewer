import './index.less';
import React, { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import type { WorkSheet } from 'xlsx';
import DataGrid, { Column } from 'react-data-grid';

type DataSet = { [index: string]: WorkSheet };
type Row = any[];
type AOAColumn = Column<Row>;
type RowCol = { rows: Row[]; columns: AOAColumn[] };

const getRowsCols = (data: DataSet, sheetName: string): RowCol => ({
  rows: utils.sheet_to_json<Row>(data[sheetName], { header: 1 }),
  columns: Array.from(
    {
      length: utils.decode_range(data[sheetName]['!ref'] || 'A1').e.c + 1,
    },
    (_, i) => ({ key: String(i), name: utils.encode_col(i), resizable: true, minWidth: 80 }),
  ),
});

// xlsx格式的附件预览
export default function XLSXPreview({ link }: { link: string }) {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>([]); // data rows
  const [columns, setColumns] = useState<AOAColumn[]>([]); // columns
  const [workBook, setWorkBook] = useState<DataSet>({} as DataSet); // workbook
  const [sheets, setSheets] = useState<string[]>([]); // list of sheet names
  const [current, setCurrent] = useState<string>(''); // selected sheet

  function selectSheet(name: string) {
    workBook[current] = utils.aoa_to_sheet(rows);
    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  useEffect(() => {
    setError(null);
    fetch(link)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        console.log('buffer', buffer);
        const data = read(buffer);
        setWorkBook(data.Sheets);
        setSheets(data.SheetNames);
        const [name] = data.SheetNames;
        const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);
        setRows(new_rows);
        setColumns(new_columns);
        setCurrent(name);
      })
      .catch((reason) => {
        setError(reason?.message ?? '解析错误，请重试!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [link]);

  if (loading) return null;

  if (error) {
    return <div>{error ?? '解析错误，请重试!'}</div>;
  }

  return (
    <>
      <div className="excel-wrap">
        {sheets.length > 0 && (
          <>
            <p>
              请选择需要查看的工作表:&nbsp;
              <select onChange={async (e) => selectSheet(sheets[+e.target.value])}>
                {sheets.map((sheet, idx) => (
                  <option key={sheet} value={idx}>
                    {sheet}
                  </option>
                ))}
              </select>
            </p>
            <div className="current">
              <b>当前工作表: {current}</b>
            </div>
            <DataGrid className="rdg-light" columns={columns} rows={rows} onRowsChange={setRows} />
          </>
        )}
      </div>
    </>
  );
}
