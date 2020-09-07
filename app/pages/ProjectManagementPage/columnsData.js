import React from 'react';
import Avatar from 'components/BasicComponents/Avatar';
import Button from 'components/BasicComponents/Button';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ProjectStatus from './components/ProjectStatus/index';
import DropdownActions from './components/DropdownActions/index';
import style from './style.module.scss';

export const projectSettingColumns = (
  handleSelectedProjectToEdit,
  setShowViewProject,
) => [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    align: 'center',
    render: (image, record) => (
      <Avatar src={image} name={record.name} size="36" />
    ),
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.projectName">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    render: (text, record) => (
      <Button
        onClick={() => handleSelectedProjectToEdit(record)}
        className={`text-blue ${style.projectNameBtn}`}
      >
        <span>{text}</span>
      </Button>
    ),
    isFixed: true,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.key">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'key',
    key: 'key',
    render: text => <span className="text-uppercase">{text}</span>,
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.lead">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'projectLead',
    key: 'projectLead',
    render: projectLead => {
      const { name } = projectLead;
      return <span className="text-capitalize">{name}</span>;
    },
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.jiraUrl">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'jiraUrl',
    key: 'jiraUrl',
    width: '30%',
    render: link => (
      <a href={link} target="_blank">
        {link}
      </a>
    ),
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.status">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: status => {
      const { code } = status;
      return <ProjectStatus code={code} />;
    },
    isFixed: true,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.action">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'actions',
    key: 'actions',
    align: 'center',
    width: '100px',
    render: (text, record) => (
      <DropdownActions
        projectItem={record}
        setShowViewProject={setShowViewProject}
        handleSelectedProjectToEdit={handleSelectedProjectToEdit}
      />
    ),
    isFixed: true,
  },
];

export const projectListColumns = [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    align: 'center',
    render: (image, record) => (
      <Avatar src={image} name={record.name} size="36" />
    ),
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.projectName">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: text => (
      <Link className="text-blue" to="#">
        {text}
      </Link>
    ),
    isFixed: true,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.key">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'key',
    key: 'key',
    render: text => <span className="text-uppercase">{text}</span>,
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.lead">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'projectLead',
    key: 'projectLead',
    render: projectLead => {
      const { name } = projectLead;
      return <span className="text-capitalize">{name}</span>;
    },
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.jiraUrl">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'jiraUrl',
    key: 'jiraUrl',
    width: '30%',
    render: link => {
      const noPropagation = e => e.stopPropagation();
      return (
        <a href={link} target="_blank" onClick={noPropagation}>
          {link}
        </a>
      );
    },
    isFixed: false,
  },
  {
    title: (
      <FormattedMessage id="projectManagement.label.status">
        {text => <span className="text-uppercase">{text}</span>}
      </FormattedMessage>
    ),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: status => {
      const { code } = status;
      return <ProjectStatus code={code} />;
    },
    isFixed: true,
  },
];

export const projectAgListColumns = intl => [
  {
    field: '',
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    colId: 'image',
  },
  {
    headerName: intl.formatMessage({
      id: 'projectManagement.label.projectName',
    }),
    field: 'name',
    width: 200,
    colId: 'name',
    filter: 'agNumberColumnFilter',
    sortable: true,
    cellClass: 'text-center',
  },
  {
    headerName: intl.formatMessage({
      id: 'projectManagement.label.key',
    }),
    field: 'key',
    width: 200,
    colId: 'key',
    filter: 'agNumberColumnFilter',
    cellClass: 'text-center',
  },
  {
    headerName: intl.formatMessage({
      id: 'projectManagement.label.lead',
    }),
    field: 'projectLead',
    editable: true,
    colId: 'projectLead',
    filter: 'agNumberColumnFilter',
    cellClass: 'text-center',
    cellRendererFramework: props => <span>{props.value.name}</span>,
  },
  {
    headerName: intl.formatMessage({
      id: 'projectManagement.label.jiraUrl',
    }),
    field: 'jiraUrl',
    width: 500,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: intl.formatMessage({
      id: 'projectManagement.label.status',
    }),
    field: 'status',
    colId: 'status',
    cellClass: 'text-center',
    cellRendererFramework: props => <ProjectStatus code={props.value.code} />,
  },
];
