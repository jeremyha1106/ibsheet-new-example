import React from 'react';
import Button from 'components/BasicComponents/Button';
import { FileExcelFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import { Table } from './table';
import { createData } from './helper';
import { useIbsheet } from './hooks';

const options = {
  Cfg: {
    SearchMode: 2,
    Alternate: 2,
    EnterMode: 5,
    ShowFilter: 1,
    Export: {
      Url: 'https://api.ibleaders.com/ibsheet/v8/',
    },
  },
  LeftCols: [{ Header: 'No', Name: 'SEQ', Width: '40' }],
  Cols: [
    { Header: 'Check', Type: 'Bool', Name: 'sCheck', Width: '60' },
    { Header: 'Company', Type: 'Text', Name: 'sCompany', Width: '150' },
    { Header: 'Country', Type: 'Text', Name: 'sCountry' },
    {
      Header: 'Sale Quantity',
      Type: 'Int',
      Name: 'sSaleQuantity',
      Width: '80',
      EditMask: '^\\d*$',
    },
    {
      Header: 'Sale Increase',
      Type: 'Int',
      Name: 'sSaleIncrease',
      Width: '80',
      EditMask: '^\\d*$',
    },
    {
      Header: 'Price',
      Type: 'Int',
      Name: 'sPrice',
      Format: '#,### \\원',
      Width: '150',
    },
    {
      Header: 'Satisfaction',
      Type: 'Int',
      Name: 'sSatisfaction',
      Format: '# \\%',
      Width: '80',
    },
    {
      Header: 'Date',
      Type: 'Date',
      Name: 'sDate',
      Format: 'dd-MM-yyyy',
      EditFormat: 'dd-MM-yyyy',
      Width: 200,
    },
    {
      Header: 'Button',
      Button: 'Button',
      Type: 'Button',
      Name: 'sBtn',
      Width: 100,
      ButtonText: 'Click me',
    },
    {
      Header: 'Comment',
      Type: 'Text',
      Name: 'sComment',
      Width: '150',
      RelWidth: 1,
    },
  ],
};

const data = createData(100);

const SheetSample = () => {
  const ibSheet = useIbsheet('sheet-sample');

  const onDownExcel = () => {
    ibSheet.ibsheet.down2Excel({
      fileName: 'test.xlsx',
    });
  };

  const onLoadExcel = () => {
    ibSheet.ibsheet.loadExcel({ mode: 'HeaderMatch' });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="d-flex align-items-center pb-2 font-size-24">
          <strong>IBSheet Example</strong>
        </h5>
        <Divider />

        <div className="inline-block float-right mb-2">
          <Button
            icon={<FileExcelFilled />}
            onClick={onDownExcel}
            style={{ marginRight: '1rem' }}
          >
            Export
          </Button>
          <Button icon={<FileExcelFilled />} onClick={onLoadExcel}>
            Import
          </Button>
        </div>

        <Table
          id="sheet-sample"
          el="sheet-sample"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default SheetSample;
