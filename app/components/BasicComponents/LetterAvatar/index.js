import React from 'react';
import defaultAvatar from 'images/avatars/1.png';
import style from './style.module.scss';
/**
 *
 * @param {dataSource} byte
 * By default this component accept byte image, in the source below, its already converted to base64
 * @param {isRounded} boolean
 * By default is True for rounded avatar
 * @param {textSize} int
 * By default is 36px for large avatar, currently support 15/24/3/6/48(px)
 *
 */
function LetterAvatar(props) {
  const { dataSource, isRounded, textSize, size, imageClassName } = props;
  const arrTwoWords = dataSource ? dataSource.split(/\s+/).slice(0, 2) : '';
  const letterAvatar = arrTwoWords
    ? arrTwoWords.map(word => word.charAt(0)).join('')
    : '';
  const renderLetterAvatar = () => (
    <span
      data-testid="avatar-letter"
      className={`
        ${style.avatar}
        ${textSize ? style[`textSize${textSize}`] : ''}
        ${size ? style[`size${size}`] : ''}
        ${isRounded ? style.rounded : style.squared}
        
        `}
    >
      {letterAvatar || (
        <img
          className={`${style.defaultAvt} ${style[imageClassName]}`}
          src={defaultAvatar}
          alt="User"
        />
      )}
    </span>
  );
  return renderLetterAvatar();
}
LetterAvatar.defaultProps = {
  textSize: 15,
  size: 36,
  isRounded: true,
};
export default LetterAvatar;
