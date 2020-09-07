import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { SearchOutlined } from '@ant-design/icons';
import { Select, Button } from 'components/BasicComponents/AntdComponent';
import AutoCompleteSelectContainer from 'containers/AutoCompleteSelectContainer';
import isNil from 'lodash/isNil';
import { COMMON_SELECT_MODE } from 'constants/common';
import style from './style.module.scss';

const { Option } = Select;

function SearchBarContainer({
  typeOptions,
  placeholder,
  onSearch,
  type,
  defaultValue,
  mode,
}) {
  const [searchType, setSearchType] = useState('');
  const [controlledVal, setControlledVal] = useState(null);
  const [selectType, setSelectType] = useState(type);
  const [selectedVal, setSelectedVal] = useState([]);
  const intl = useIntl();

  const getCurrentOpt = value => typeOptions.find(opt => opt.value === value);

  useEffect(() => {
    // Get Init type
    const sltType = typeOptions[0].type;
    if (!isNil(sltType)) {
      setSelectType(sltType);
    }
  }, []);

  const handleTypeChange = value => {
    const sltType = getCurrentOpt(value).type;
    if (!isNil(sltType)) {
      setSelectType(sltType);
    } else {
      setSelectType(type);
    }
    setSearchType(value);
    setControlledVal([]);
  };

  const onSelectChange = value => {
    setSelectedVal(value);
  };

  const onSearchClick = () => {
    onSearch(selectedVal);
  };

  return (
    <div className={style.searchComponentContainer}>
      {typeOptions.length > 0 && (
        <Select
          defaultValue={defaultValue}
          className={style.typeSelect}
          onChange={handleTypeChange}
        >
          {typeOptions.map(t => (
            <Option key={t.value} value={t.value}>
              {t.name}
            </Option>
          ))}
        </Select>
      )}
      <AutoCompleteSelectContainer
        className={style.multiSelect}
        placeholder={placeholder}
        searchType={searchType}
        selectType={selectType}
        onSelectChange={onSelectChange}
        controlledVal={controlledVal}
        mode={mode}
      />
      <Button icon={<SearchOutlined />} type="primary" onClick={onSearchClick}>
        {intl.formatMessage({
          id: 'common.button.search',
        })}
      </Button>
    </div>
  );
}

SearchBarContainer.propTypes = {
  mode: PropTypes.string,
  typeOptions: PropTypes.array,
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  defaultValue: PropTypes.string,
};

SearchBarContainer.defaultProps = {
  typeOptions: [],
  placeholder: '',
  onSearch: null,
  mode: COMMON_SELECT_MODE.MULTIPLE,
};

export default SearchBarContainer;
