import React, { useState } from 'react';
import { Upload } from 'antd';
import imageCompression from 'browser-image-compression';
import { useIntl } from 'react-intl';
import { compressedOption, compressedThumbnailOption } from './config';
import LetterAvatar from '../LetterAvatar';
import styles from './style.module.scss';

function ImageUploader(props) {
  const {
    imageUrl,
    size,
    borderColor,
    border,
    borderRadius,
    imageUploaded,
    userName,
  } = props;
  const intl = useIntl();
  const [getImgUrl, setImgUrl] = useState(imageUrl);
  const [getError, setError] = useState('');
  // ToBase64 itself is a promise => Loop through image array =>
  // Create an array of promise which is an another array know as FileReader => Promise resolve file reader result
  // Then push this promise into the outer array
  // Return an array of promises ==> .then to get the last resolved value of these two images.
  // Happy refactoring :).
  const toBase64 = input => {
    if (Array.isArray(input)) {
      const promises = [];
      input.forEach(i => {
        const p = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(i);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });

        promises.push(p);
      });
      return Promise.all(promises);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleChange = info => {
    const { file } = info;
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpeg';
    if (!isJpgOrPng) {
      setError(intl.formatMessage({ id: 'error.file.type' }));
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setError(intl.formatMessage({ id: 'error.file.size' }));
      getError();
      return;
    }
    const imageCPromise = imageCompression(file, compressedOption);
    const thumbnailCPromise = imageCompression(file, compressedThumbnailOption);
    Promise.all([imageCPromise, thumbnailCPromise]).then(function(
      compressedFiles,
    ) {
      toBase64(compressedFiles).then(images => {
        const toBin = images.map(image =>
          image.slice(image.indexOf(',') + 1, image.length),
        );
        setError('');
        // The first value represent for compressed image, the second one is for the thumbnail
        setImgUrl(toBin[0]);
        // bind callback value here
        imageUploaded(toBin);
      });
    });
  };

  const renderLetterAvt = () => (
    <>
      <LetterAvatar dataSource={userName} textSize={36} size={200} />
    </>
  );

  const renderImageUploader = () => (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className={`avatar-uploader ${size ? styles[`size${size}`] : ''} ${
          border ? styles.border : ''
        }`}
        style={{
          borderColor,
          borderRadius,
        }}
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {getImgUrl ? (
          <img
            src={`data:image/jpg;base64,${getImgUrl}`}
            alt="avatar"
            data-testid="avatar-img"
            style={{ width: '100%' }}
          />
        ) : (
          renderLetterAvt()
        )}{' '}
      </Upload>
      <p className="text-danger" data-testid="error-text">
        {getError}
      </p>
    </>
  );

  return renderImageUploader();
}

ImageUploader.defaultProps = {
  imageUrl: '',
  size: false,
  border: false,
  borderColor: '#d2d9e5',
  src: '',
  userName: 'Anonymous',
};
export default ImageUploader;
