import React from 'react';
import LetterAvatar from '../LetterAvatar';
import style from './style.module.scss';

function Avatar(props) {
  const {
    size,
    textSize,
    borderColor,
    src,
    name,
    border,
    isRounded,
    imageClassName,
  } = props;

  return src ? (
    <a
      className={`
      ${style.avatar}
      ${size ? style[`size${size}`] : ''}
      ${border ? style.border : ''}
      ${isRounded ? style.rounded : style.squared}
      `}
      // eslint-disable-next-line no-script-url
      href="javascript: void(0);"
      style={{
        borderColor,
      }}
    >
      <img src={`data:image/jpg;base64,${src}`} alt="User" />
    </a>
  ) : (
    <LetterAvatar
      dataSource={name}
      isRounded={isRounded}
      textSize={textSize}
      size={size}
      imageClassName={imageClassName}
    />
  );
}

Avatar.defaultProps = {
  size: 36,
  border: false,
  isRounded: true,
  borderColor: '#d2d9e5',
  src: '',
};

export default Avatar;
