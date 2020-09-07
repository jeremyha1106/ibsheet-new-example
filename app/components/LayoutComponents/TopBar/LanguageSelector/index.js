import React from 'react';
import { Menu, Dropdown } from 'antd';
import { appLocales, appLocalesDetail } from 'i18n';
import styles from './style.module.scss';

function LanguageSelector(props) {
  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[props.locale]}
      onClick={props.onChangeLang}
    >
      {appLocales.map((lang, index) => (
        <Menu.Item key={lang}>{appLocalesDetail[index]}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={langMenu} placement="bottomRight" trigger={['click']}>
      <div className={styles.dropdown}>
        <strong className="text-uppercase">{props.locale}</strong>
      </div>
    </Dropdown>
  );
}

export default LanguageSelector;
