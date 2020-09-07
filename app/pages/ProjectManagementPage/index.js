import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import DynamicTable from 'components/DynamicComponents/DynamicTable';
import Button from 'components/BasicComponents/Button';
import { getCurrentUserData, fetchUserList } from 'store/user/actions';
import { Divider } from 'antd';
import * as auth from 'utils/authHelper';
import TableSetting from 'components/BasicComponents/TableSetting';
import { showConfirm } from 'components/BasicComponents/Modal';
import { USER_ROLE } from 'store/user/constants';
import { FileAddOutlined } from '@ant-design/icons';
import AgGridTable from 'components/BasicComponents/AgGrid';
import NewProject from './components/NewProject';
import SearchForm from './components/SearchForm';
import {
  getProjectList,
  getProjectLoading,
  getPagingConfig,
  getLastAction,
  getSeachStr,
  getResetSearchForm,
} from './selectors';
import {
  fetchProjectList,
  updateLastAction,
  updateSearchStr,
  clearSearchForm,
} from './actions';
import {
  projectSettingColumns,
  projectListColumns,
  projectAgListColumns,
} from './columnsData';
import * as actions from './constants';
import style from './style.module.scss';
function ProjectManagementPage(props) {
  const intl = useIntl();
  const {
    projectList,
    isLoading,
    pagingConfig,
    isResetSearchForm,
    isProjectSetting = true,
  } = props;

  const { itemPerPage, pageNum, totalCount } = pagingConfig;
  const [showNewProject, setShowNewproject] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showViewProject, setShowViewProject] = useState(false);
  const userInfo = auth.getUserInfo();
  const isAdmin = get(userInfo, 'userRoles[0].code') === USER_ROLE.ADMIN;

  // reset last action when component unmount
  useEffect(
    () => () => {
      props.updateLastAction('');
      props.clearSearchForm(false);
      props.updateSearchStr('');
    },
    [],
  );

  // this func trigger when a action complete
  useEffect(() => {
    switch (props.lastAction) {
      case actions.SET_ACTIVE_PROJECT_SUCCESS:
      case actions.SET_INACTIVE_PROJECT_SUCCESS:
        {
          const config = {
            params: {
              searchCriteria: props.searchStr,
              direction: '',
              itemPerPage,
              pageNum, // page count server start from 0, but antd table from 1
            },
          };
          props.fetchProjectList(config);
          props.getCurrentUserData();
        }
        break;
      default:
        break;
    }
  }, [props.lastAction]);

  const fetchUserListFunc = () => {
    const data = {
      body: {
        searchCriteria: {
          searchString: '',
        },
        itemPerPage: 1000, // get all user for assign project
      },
    };
    props.fetchUserList(data);
  };

  useEffect(() => {
    const config = {
      params: {
        searchCriteria: '',
        direction: '',
        itemPerPage,
        pageNum: 0, // page count server start from 0, but antd table from 1
      },
    };
    props.fetchProjectList(config);
  }, []);

  const handleSearchProject = searchStr => {
    const config = {
      params: {
        searchCriteria: searchStr,
        direction: '',
        itemPerPage,
        pageNum: 0, // page count server start from 0, but antd table from 1
      },
    };
    props.updateSearchStr(searchStr);
    props.fetchProjectList(config);
  };

  const onTableChange = pagination => {
    let payload = {
      params: {
        ...pagingConfig,
      },
    };

    // on paging
    // page count server start from 0, but antd table from 1
    if (pagination.current - 1 !== pageNum) {
      payload.params.pageNum = pagination.current - 1;
    }

    if (props.searchStr) {
      payload = {
        ...payload,
        params: {
          ...payload.params,
          searchCriteria: props.searchStr,
        },
      };
    }

    props.fetchProjectList(payload);
  };

  const onRedirectDashboard = record => {
    props.getProjectItem(record.id);
  };

  const handleSelectedProjectToEdit = projectItem => {
    if (!isAdmin) return;
    fetchUserListFunc();
    setShowViewProject(true);
    const projectSelected = projectList.find(p => p.id === projectItem.id);
    auth.setProjectItem(projectSelected);
  };

  // TABLE SETTING
  const projectListData = isProjectSetting
    ? projectSettingColumns(handleSelectedProjectToEdit, setShowViewProject)
    : projectListColumns;
  const showColumnsDefault = projectListData.map(item => item.dataIndex) || [];
  const columnsFixed =
    projectListData.filter(item => item.isFixed).map(item => item.dataIndex) ||
    [];
  const [showedColumns, setColumns] = useState(showColumnsDefault);
  let showTableColumns = projectListData.filter(col =>
    showedColumns.includes(col.dataIndex),
  );
  if (!isAdmin) {
    showTableColumns = showTableColumns.filter(
      col => col.dataIndex !== 'actions',
    );
  }
  // END TABLE SETTING

  const confirmCloseDrawer = (form, originDataProject, isViewProject) => {
    if (isEqual(originDataProject, form.getFieldsValue())) {
      if (isViewProject) setShowViewProject(false);
      else setShowNewproject(false);
    } else {
      showConfirm(
        {
          title: intl.formatMessage({
            id: isViewProject
              ? 'projectManagement.modal.leave.edit'
              : 'projectManagement.modal.leave.create',
          }),
        },
        () => {
          if (isViewProject) setShowViewProject(false);
          else setShowNewproject(false);
          form.resetFields();
        },
        null,
      );
    }
  };

  const createProject = () => {
    fetchUserListFunc();
    setShowNewproject(true);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="d-flex align-items-center pb-2 font-size-24">
          <strong>
            {isProjectSetting ? (
              <FormattedMessage id="projectManagement.title" />
            ) : (
              <FormattedMessage id="projectList.title" />
            )}
          </strong>
        </h5>

        <SearchForm
          placeholder={intl.formatMessage({
            id: 'projectManagement.search.placeholder',
          })}
          onSearch={handleSearchProject}
          className={`${style.search} mr-3`}
          isResetForm={isResetSearchForm}
        />
        <Divider />

        {isProjectSetting && isAdmin && (
          <div className="inline-block float-right mb-2">
            <Button
              type="primary"
              icon={<FileAddOutlined />}
              onClick={createProject}
            >
              {intl.formatMessage({
                id: 'projectManagement.button.newProject',
              })}
            </Button>
            <TableSetting
              showedColumns={showTableColumns}
              totalColumns={projectListData}
              setColumns={cols => setColumns(cols)}
              columnsFixed={columnsFixed}
            />
          </div>
        )}
        <NewProject
          showNewProject={showNewProject}
          setShowNewproject={setShowNewproject}
          confirmCloseDrawer={confirmCloseDrawer}
        />

        <DynamicTable
          dataSource={projectList}
          columns={showTableColumns}
          loading={isLoading}
          showTotal
          totalCount={totalCount}
          totalText="projectManagement.label.totalText"
          onRow={record =>
            !isProjectSetting && {
              onClick: () => onRedirectDashboard(record),
            }
          }
          onChange={onTableChange}
          rowKey="id"
          pagination={{
            current: pageNum + 1,
            pageSize: itemPerPage,
            total: totalCount,
            showSizeChanger: false,
          }}
        />
        <AgGridTable
          columnDefs={projectAgListColumns(intl)}
          rowData={[...projectList]}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  projectList: getProjectList,
  pagingConfig: getPagingConfig,
  isLoading: getProjectLoading,
  lastAction: getLastAction,
  searchStr: getSeachStr,
  isResetSearchForm: getResetSearchForm,
});

const mapDispatchToProps = {
  fetchProjectList,
  updateLastAction,
  getCurrentUserData,
  updateSearchStr,
  clearSearchForm,
  fetchUserList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectManagementPage);
