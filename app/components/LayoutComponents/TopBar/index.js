import React from 'react';
import LanguageSelector from 'containers/LanguageSelectorContainer';
import * as auth from 'utils/authHelper';
import ProfileMenu from './UserMenu';
import style from './style.module.scss';

function TopBar() {
  const isAccessDashboard = auth.getAccessDashboard();

  return (
    <div className={style.topbar}>
      {!isAccessDashboard && ( // render logo when user don't have any project at 403 page
        <div className={style.logoContainer}>
          <div className={style.logo}>
            <img
              src="/resources/images/metanet-logo-circle.png"
              className="mr-2"
              alt="MetaTest"
            />
            <div className={style.name}> MetaTest </div>
          </div>
        </div>
      )}
      <div className="mr-4 d-none d-sm-block">
        <LanguageSelector />
      </div>
      <div className="" data-testid="avatar-dropdown">
        <ProfileMenu />
      </div>
    </div>
  );
}

export default TopBar;
