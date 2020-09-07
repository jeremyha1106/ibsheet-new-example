import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'components/BasicComponents/AntdComponent';
import SearchFilterModal from '../FilterModal';
import { toggleModal } from '../../actions';

function GroupActions(props) {
  const dispatch = useDispatch();

  const handleClickSearch = () => {
    dispatch(toggleModal(true));
  };

  return (
    <div className="toolbar">
      <div>
        <Button onClick={handleClickSearch}>
          <FormattedMessage id="scheduler.placeholder.search" />
        </Button>
      </div>

      <SearchFilterModal />
      <div className="right-actions">
        <Button onClick={props.onToday}>
          <FormattedMessage id="scheduler.label.bulkUpdate" />
        </Button>
        <Button onClick={props.onToday}>
          <FormattedMessage id="scheduler.label.assign" />
        </Button>
        <Button onClick={props.onToday} icon={<DownloadOutlined />}>
          <span>
            <FormattedMessage id="scheduler.label.export" />
          </span>
        </Button>
      </div>
    </div>
  );
}

export default GroupActions;
