import React, { useState } from 'react';
import Menu from 'antd/es/menu';
import 'antd/es/menu/style/css';
import Dropdown from 'components/BasicComponents/Dropdown';
// import AssignUserContainer from 'containers/common/AssignUserContainer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { showConfirm } from 'components/BasicComponents/Modal';
import { useIntl, FormattedMessage, IntlProvider } from 'react-intl';
import { fetchUserList } from 'store/user/actions';
import { getUserList } from 'store/user/selectors';
import isEmpty from 'lodash/isEmpty';
import { ACTIVE_PROJECT_STATUS } from '../../constants';
import { getProjectList } from '../../selectors';
import { setActiveProject, setInactiveProject } from '../../actions';
import style from './style.module.scss';
function DropdownActions(props) {
  const { projectItem, handleSelectedProjectToEdit, userList } = props;
  // eslint-disable-next-line no-unused-vars
  const [visibleState, setVisibleState] = useState(false);
  const { id, status } = projectItem;
  const isActive = status.code === ACTIVE_PROJECT_STATUS;
  const intl = useIntl();

  const changeStatusModalOptions = {
    title: (
      <IntlProvider locale={intl.locale} messages={intl.messages}>
        <FormattedMessage
          id="modal.inactive.content"
          values={{
            status: `${isActive ? 'deactivate' : 'activate'}`,
            projectName: (
              <strong className="text-capitalize">{projectItem.name}</strong>
            ),
          }}
        />
      </IntlProvider>
    ),
    okText: intl.formatMessage({ id: 'common.button.yes' }),
    cancelText: intl.formatMessage({ id: 'common.button.no' }),
  };

  const handleChangeStatus = () => {
    if (isActive) {
      props.setInactiveProject(id);
    } else {
      props.setActiveProject(id);
    }
  };

  const handleStatusAction = () => {
    showConfirm(changeStatusModalOptions, () => handleChangeStatus(), null);
  };

  const { setShowViewProject } = props;
  const menu = () => (
    <Menu className={style.link}>
      <Menu.Item
        key="edit"
        onClick={() => {
          handleSelectedProjectToEdit(projectItem);
          setShowViewProject(true);
          if (isEmpty(userList)) {
            const data = {
              body: {
                searchCriteria: {
                  searchString: '',
                },
                itemPerPage: 100,
              },
            };
            props.fetchUserList(data);
          }
        }}
      >
        <i className="fa fa-edit mr-2" />
        {intl.formatMessage({
          id: 'projectManagement.button.edit',
        })}
      </Menu.Item>
      <Menu.Item key="assign" onClick={() => setVisibleState(true)}>
        <i className="fa fa-users mr-2" />
        {intl.formatMessage({
          id: 'projectManagement.button.addMember',
        })}
      </Menu.Item>

      <Menu.Item key="inactive" onClick={handleStatusAction}>
        <i className="fa fa-eye-slash mr-2" />
        {intl.formatMessage({
          id: `projectManagement.button.${isActive ? 'deactivate' : 'active'}`,
        })}
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <i className="fa fa-ellipsis-h btn btn-light text-blue" />
      </Dropdown>
      {/* <AssignUserContainer */}
      {/*  visible={visibleState} */}
      {/*  onCancel={() => setVisibleState(false)} */}
      {/*  projectId={id} */}
      {/*  projectName={name} */}
      {/* /> */}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  projectList: getProjectList,
  userList: getUserList,
});

const mapDispatchToProps = {
  setActiveProject,
  setInactiveProject,
  fetchUserList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownActions);
