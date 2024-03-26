import { useState } from 'react';

import { type AxiosError } from 'axios';

import { ReactComponent as DefaultImage } from '~/assets/image.svg';

import styles from './ImageForm.module.scss';
import { gymInstance } from '../../../api/instance';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch } from '../../../store/store.types';
import { fetchUser } from '../../../store/user/user.api';

interface ImageError {
  message: string;
}

export const ImageForm = () => {
  const [image, setImage] = useState<string>('');
  const [imageAsFile, setImageAsFile] = useState<File>();
  const [isImageLarge, setIsImageLarge] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] =
    useState<AxiosError<ImageError> | null>(null);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    setImageAsFile(event.target.files[0]);
    const maxSizeInBytes = 1 * 1024 * 1024;
    setIsImageLarge(event.target.files[0].size > maxSizeInBytes);
    const data = new FileReader();
    data.addEventListener('load', () => {
      const result = String(data.result);
      setImage(result);
    });
    data.readAsDataURL(event.target.files[0]);
  };

  const onSubmit = (): void => {
    if (imageAsFile) {
      const formData = new FormData();
      formData.append('file', imageAsFile);
      gymInstance
        .post('User/avatar', formData)
        .then(() => {
          setErrorMessage(null);
          void dispatch(fetchUser());
        })
        .catch((error: AxiosError<ImageError>) => {
          setErrorMessage(error);
        });
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="image">
        <div className={styles.image_overflow}>
          {image ? <img src={image}></img> : <DefaultImage />}
        </div>
        <input
          type="file"
          id="image"
          onChange={handleChange}
          accept=".jpg, .jpeg, .png"
        />
      </label>
      {errorMessage && (
        <p className={styles.error}>
          Error: {errorMessage.response?.data.message}
        </p>
      )}

      <Button
        type="submit"
        appearance="secondary"
        className={styles.image_btn}
        disabled={!imageAsFile || isImageLarge}
      >
        Bild auswählen
      </Button>
      {isImageLarge && (
        <p className={styles.error}>
          Die Bildgröße sollte 1 MB nicht überschreiten
        </p>
      )}
    </form>
  );
};
