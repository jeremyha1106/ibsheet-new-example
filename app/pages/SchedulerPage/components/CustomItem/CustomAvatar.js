import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import Avatar from 'components/BasicComponents/Avatar';

import styles from '../../styles.module.scss';

export default function CustomAvatarItem(props) {
  const { name, avatar } = props;

  return (
    <div className={styles.customAvatar}>
      {avatar ? (
        <>
          <Avatar size={48} src={avatar} />
          <div className="ml-3">{name}</div>
        </>
      ) : (
        <>
          <Avatar size={48} icon={<UserOutlined />} />
          <div className="ml-3">{name}</div>
        </>
      )}
    </div>
  );
}
