import React from 'react';
import { useSelector } from 'react-redux';

import DateRangeForm from './DateRangeForm';
import ProjectFilterForm from './ProjectFilterForm';

import { selectSelectedFilterForm } from '../../selectors';
import { FOMR_TYPE } from '../../constants';

function FilterFormGroup() {
  const selectedFilterForm = useSelector(selectSelectedFilterForm);

  const generateFormFilter = () => {
    switch (selectedFilterForm) {
      case FOMR_TYPE.PROJECTS:
        return <ProjectFilterForm />;

      // will replace the text with form components here
      case FOMR_TYPE.RESOURCES:
        return <div>Form component of resources</div>;

      // will replace the text with form components here
      case FOMR_TYPE.CLIENTS:
        return <div>Form component of client</div>;

      // will replace the text with form components here
      case FOMR_TYPE.ALLOCATION_STATUS:
        return <div>Form component of allocation status</div>;

      default:
        return <DateRangeForm />;
    }
  };

  return <div className="form-filter">{generateFormFilter()}</div>;
}

export default FilterFormGroup;
