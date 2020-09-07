import React from 'react';
import Button from 'components/BasicComponents/Button';
import Select from 'components/BasicComponents/Select';
import { FormattedMessage } from 'react-intl';
import styles from './style.module.scss';

const { Option } = Select;

function Assignee(props) {
  const { options, onChange } = props;
  return (
    <div className="d-flex align-items-center mb-4 mt-2">
      <FormattedMessage id="testExecutions.assignTo" />
      <Select className={styles.assignee} onChange={onChange}>
        {options &&
          options.map(o => (
            <Option value={o.value} key={o.username}>
              {`${o.first_name} ${o.last_name}`}
            </Option>
          ))}
      </Select>

      <div className="text-right">
        <Button className="mx-2" type="primary">
          <FormattedMessage id="testExecutions.button.apply" />
        </Button>
        <Button type="primary">
          <FormattedMessage id="testExecutions.button.filter" />
        </Button>
      </div>
    </div>
  );
}

export default Assignee;
