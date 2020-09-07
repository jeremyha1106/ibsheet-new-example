import React, { memo, useState, useEffect } from 'react';
import Button from 'components/BasicComponents/Button';
import Slider from 'components/BasicComponents/Slider';
import ImageUploader from 'components/BasicComponents/ImageUploader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getUserList } from 'store/user/selectors';
import * as auth from 'utils/authHelper';
import { Form } from 'antd';
import { compose } from 'redux';
import get from 'lodash/get';
import { PROJECT_STATUS_TYPE } from 'store/user/constants';
import InputComponent from 'components/BasicComponents/Input';
import { FormattedMessage, useIntl } from 'react-intl';
import Select from 'components/BasicComponents/Select';
import isEmpty from 'lodash/isEmpty';
import { SaveOutlined } from '@ant-design/icons';
import { submitCreateProject } from './actions';
import { makeInitForm } from './selectors';
import style from './style.module.scss';

const { Option } = Select;

let initOpen = true;

function NewProject({ ...props }) {
  const userInfo = auth.getUserInfo();
  const intl = useIntl();
  const [form] = Form.useForm();
  const { userList } = props;
  const [selectOption, setSelectOption] = useState([]);
  // const valueFieldForm = {
  //   ...initForm,
  //   projectLead: userInfo ? userInfo.id : '',
  // };
  const [avtBinary, setAvtBinary] = useState('');

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  useEffect(() => {
    // see line 50
    if (props.showNewProject) {
      initOpen = true;
    }
  }, [props.showNewProject]);

  useEffect(() => {
    // this will trigger only 1 when drawer open to keep user list for dropdown
    // when drawer open angain initOpen will reset
    if (!initOpen) return;
    if (!isEmpty(userList)) initOpen = false;

    const convertUserList = userList
      .filter(user => user.name && user.name.trim())
      .map(user => ({
        id: user.id,
        value: user.id,
        text: user.name,
      }));
    setSelectOption(convertUserList);
  }, [userList]);

  const handelCancelModal = () => {
    props.confirmCloseDrawer(form, originDataProject, false);
  };

  const originDataProject = {
    projectName: '',
    projectKey: '',
    jiraUrl: '',
    projectLead: userInfo ? get(userInfo, 'id', '') : '',
    projectStatus: PROJECT_STATUS_TYPE.ACTIVE,
  };

  const confirmToSave = value => {
    const fieldSubmit = {
      jiraUrl: value.jiraUrl,
      key: value.projectKey,
      name: value.projectName,
      projectLead: {
        id: value.projectLead,
      },
      status: {
        code: value.projectStatus,
      },
      image: avtBinary,
    };
    props.submitCreateProject(fieldSubmit);
    form.resetFields();
    props.setShowNewproject(false);
  };

  const onImageUploaded = images => {
    // First one => Compressed Img
    // Second one => Thumbnail Img
    setAvtBinary(images[0]);
  };

  return (
    <Slider
      visible={props.showNewProject}
      width={600}
      title={intl.formatMessage({
        id: 'projectManagement.create.project',
      })}
      onClose={handelCancelModal}
      className={style.formDrawer}
      destroyOnClose
      maskClosable={false}
    >
      <Form {...layout} form={form} onFinish={confirmToSave}>
        <div className={style.createAvatar}>
          <div className={style.createAvatar}>
            <ImageUploader imageUploaded={onImageUploaded} size={200} />
          </div>
        </div>
        <Form.Item
          label={intl.formatMessage({
            id: 'common.create.project.form.label.projectName',
          })}
          name="projectName"
          rules={[
            {
              required: true,
              whitespace: true,
              message: intl.formatMessage(
                {
                  id: 'common.form.isRequired',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.projectName',
                  }),
                },
              ),
            },
            {
              max: 120,
              message: intl.formatMessage(
                {
                  id: 'common.form.validate.maximum',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.projectName',
                  }),
                  length: '120',
                },
              ),
            },
          ]}
        >
          <InputComponent />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'common.create.project.form.label.projectKey',
          })}
          name="projectKey"
          rules={[
            {
              required: true,
              whitespace: true,
              message: intl.formatMessage(
                {
                  id: 'common.form.isRequired',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.projectKey',
                  }),
                },
              ),
            },
            {
              max: 20,
              message: intl.formatMessage(
                {
                  id: 'common.form.validate.maximum',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.projectKey',
                  }),
                  length: '20',
                },
              ),
            },
          ]}
        >
          <InputComponent />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'common.create.project.form.label.projectLead',
          })}
          name="projectLead"
          key="projectLead"
        >
          <Select renderOnDrawer>
            {selectOption &&
              selectOption.map(o => (
                <Option value={o.value} key={o.value}>
                  {o.text}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'common.create.project.form.label.jiraUrl',
          })}
          name="jiraUrl"
          rules={[
            {
              required: true,
              whitespace: true,
              message: intl.formatMessage(
                {
                  id: 'common.form.isRequired',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.jiraUrl',
                  }),
                },
              ),
            },
            {
              max: 120,
              message: intl.formatMessage(
                {
                  id: 'common.form.validate.maximum',
                },
                {
                  field: intl.formatMessage({
                    id: 'common.create.project.form.label.jiraUrl',
                  }),
                  length: '120',
                },
              ),
            },
          ]}
        >
          <InputComponent
            placeholder={intl.formatMessage({
              id: 'common.create.project.form.placeholder.jiraUrl',
            })}
          />
        </Form.Item>
        <Form.Item
          label={intl.formatMessage({
            id: 'common.create.project.form.label.status',
          })}
          name="projectStatus"
        >
          <Select renderOnDrawer>
            <Option value="ACTIVE">Active</Option>
            <Option value="INACTIVE">Inactive</Option>
            <Option value="ON_HOLD">On Hold</Option>
          </Select>
        </Form.Item>
        <div className={style.buttonDrawer}>
          <Button
            htmlType="submit"
            className="mr-2"
            type="primary"
            icon={<SaveOutlined />}
          >
            {intl.formatMessage({
              id: 'common.button.save',
            })}
          </Button>

          <Button onClick={handelCancelModal} type="default">
            <FormattedMessage id="common.button.cancel" />
          </Button>
        </div>
      </Form>
    </Slider>
  );
}
const mapDisPatchToProps = {
  submitCreateProject,
};

const mapStateToProps = createStructuredSelector({
  initForm: makeInitForm(),
  userList: getUserList,
});
const withConnect = connect(
  mapStateToProps,
  mapDisPatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewProject);
