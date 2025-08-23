import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/lib';
import React, { useEffect, useState } from 'react';

import type { TCreateMealFormData } from '@/d.features/meal';
import { UiButton, UiInput, UiUpload } from '@/f.shared/ui';

import { useGetAiPhotoMealSuggestion } from '../../api/queries/useGetAiPhotoMealSuggestion.ts';
import type { TGetAiPhotoMealSuggestionReq } from '../../api/requests/get-ai-photo-meal-suggestion.request.ts';
import styles from './PhotoAiAddMealForm.module.scss';

type PhotoAiAddMealFormProps = {
  setAiSuggestion: (value: TCreateMealFormData) => void;
};

export const PhotoAiAddMealForm = ({
  setAiSuggestion,
}: PhotoAiAddMealFormProps) => {
  const [weight, setWeight] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutate } = useGetAiPhotoMealSuggestion({
    onSuccess: (data) => {
      setAiSuggestion(data);
    },
  });

  const onPhotoUpload = ({ fileList }: UploadChangeParam<UploadFile>) => {
    if (fileList.length) {
      setFileList(fileList);
    }
  };

  const onSubmit = async () => {
    if (weight && fileList.length) {
      const formData = new FormData();

      formData.append('weight', weight);
      formData.append('photo', fileList[0].originFileObj as File);

      mutate(formData as TGetAiPhotoMealSuggestionReq);
    }
  };

  useEffect(() => {
    return () => {
      setWeight('');
      setFileList([]);
    };
  }, []);

  return (
    <div className={styles.aiPhotoForm}>
      <UiInput
        placeholder="Введите вес блюда"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.currentTarget.value)}
      />

      <UiUpload fileList={fileList} onChange={onPhotoUpload}>
        <UiButton>Загрузить фото</UiButton>
      </UiUpload>

      <UiButton onClick={onSubmit} disabled={!weight && !fileList.length}>
        Рассчитать
      </UiButton>
    </div>
  );
};
