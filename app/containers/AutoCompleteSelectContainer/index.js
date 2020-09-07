import React, { useState, useEffect, forwardRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin } from 'components/BasicComponents/AntdComponent';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { COMMON_SELECT_MODE } from 'constants/common';
import { selectList, selectListLoading } from './selectors';
import { getListData, clearListData } from './actions';
import style from './style.module.scss';
import { DEFAULT_SEARCH_TYPE } from './constants';

const { Option } = Select;

const MultiSelectContainer = forwardRef(
  (
    {
      className,
      placeholder,
      searchType,
      selectType,
      onSelectChange,
      controlledVal,
      mode,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState([]);
    const dispatch = useDispatch();
    const selectListSelector = useMemo(selectList, []);
    const selectListLoadingSelector = useMemo(selectListLoading, []);
    const isLoading = useSelector(state => selectListLoadingSelector(state));
    const dataList = useSelector(state => selectListSelector(state));

    useEffect(() => {
      if (!isNil(controlledVal)) {
        setValue(controlledVal);
        dispatch(clearListData());
      }
    }, [controlledVal]);

    const fetchData = val => {
      if (!isNil(val) && !isEmpty(val)) {
        const params = {
          code: searchType || DEFAULT_SEARCH_TYPE,
          value: val,
          type: selectType,
        };
        dispatch(getListData(params));
      } else {
        dispatch(clearListData());
      }
    };

    const handleChange = val => {
      setValue(val);

      let returnList = [];
      if (mode === COMMON_SELECT_MODE.MULTIPLE) {
        returnList = val.map(opt => {
          const newOpt = dataList.find(data => data.code === opt.value);
          return newOpt;
        });
      } else {
        const newOpt = dataList.find(data => data.code === val.value);
        returnList = [newOpt];
      }

      if (typeof onSelectChange === 'function') {
        onSelectChange(returnList);
      }

      if (typeof props.onChange === 'function') {
        props.onChange(returnList);
      }
    };

    const renderOptionItem = (item, index) => (
      <Option key={index} value={item.code}>
        {item.name}
      </Option>
    );

    return (
      <Select
        ref={ref}
        mode={mode}
        showSearch="true"
        labelInValue
        value={value}
        placeholder={placeholder}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={fetchData}
        onChange={handleChange}
        className={`${style.multiSelect} ${className}`}
      >
        {dataList.map(renderOptionItem)}
      </Select>
    );
  },
);

export default MultiSelectContainer;
