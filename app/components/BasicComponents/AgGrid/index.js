import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import classnames from 'classnames';
import styles from './style.module.scss';

function AgGrid({ columnDefs, rowData, ...props }) {
  const defaultColDef = {
    filter: true,
    sortable: true,
    resizable: true,
    editable: true,
    flex: 1,
    minWidth: 200,
  };
  const onGridReady = params => {
    params.api.sizeColumnsToFit();
    params.api.setDomLayout('autoHeight');
  };
  return (
    <div className={classnames(styles.agTable, 'ag-theme-alpine')}>
      <AgGridReact
        // Props
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
        modules={AllCommunityModules}
        onGridReady={onGridReady}
        pagination
        rowSelection="multiple"
        paginationPageSize={20}
        rowHeight={60}
        // Other props
        {...props}
      />
    </div>
  );
}

AgGrid.propTypes = {
  columnDefs: PropTypes.array,
  rowData: PropTypes.array,
  onGridReady: PropTypes.func,
};

AgGrid.defaultProps = {
  columnDefs: null,
  rowData: [],
};

export default AgGrid;
