import { BrowserMultiFormatReader } from '@zxing/browser';
import type { IScannerControls } from '@zxing/browser/esm/common/IScannerControls';
import type { Result } from '@zxing/library';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { TCreateMealFormData } from '@/d.features/meal';
import { useGetProductByBarcode } from '@/e.entities/product';
import { UiButton, UiCard, UiFlex, UiInput, UiTypography } from '@/f.shared/ui';

import styles from './BarcodeMealScanner.module.scss';
import { NutritionCard } from './components/NutritionCard.tsx';
import {
  getLookupErrorMessage,
  getScannerErrorMessage,
} from './lib/barcodeScanner.errors.ts';
import { calculateMealNutrition } from './lib/calculateMealNutrition.ts';

type BarcodeMealScannerProps = {
  setMealSuggestion: (meal: TCreateMealFormData) => void;
};

const DEFAULT_GRAMS = 100;

export const BarcodeMealScanner = ({
  setMealSuggestion,
}: BarcodeMealScannerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [barcode, setBarcode] = useState('');
  const [grams, setGrams] = useState(DEFAULT_GRAMS);

  const { mutate, data, isPending, error, reset } = useGetProductByBarcode({
    onSuccess: (product) => {
      setBarcode(product.barcode);
    },
  });

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const nutrition = useMemo(() => {
    if (!data) return null;

    return calculateMealNutrition(data, grams);
  }, [data, grams]);

  const startScanner = async () => {
    setScannerError(null);
    reset();

    if (!navigator.mediaDevices?.getUserMedia) {
      setScannerError('Камера недоступна в этом браузере');
      return;
    }

    if (!videoRef.current) {
      return;
    }

    try {
      stopScanner();
      readerRef.current = new BrowserMultiFormatReader();
      setIsScanning(true);
      const controls = await readerRef.current.decodeFromVideoDevice(
        undefined,
        videoRef.current,
        (result: Result | undefined) => {
          if (!result) return;

          const scannedBarcode = result.getText();
          setBarcode(scannedBarcode);
          stopScanner();
          mutate(scannedBarcode);
        },
      );
      controlsRef.current = controls;
    } catch (e) {
      setIsScanning(false);
      setScannerError(getScannerErrorMessage(e));
    }
  };

  const stopScanner = () => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setIsScanning(false);
  };

  const lookupBarcode = () => {
    const normalizedBarcode = barcode.trim();
    if (!normalizedBarcode) {
      setScannerError('Введите штрихкод');
      return;
    }

    stopScanner();
    setScannerError(null);
    mutate(normalizedBarcode);
  };

  const applyProduct = () => {
    if (!nutrition) return;

    setMealSuggestion(nutrition);
  };

  return (
    <UiFlex direction="column" gap="s" className={styles.scanner}>
      <video ref={videoRef} className={styles.video} muted playsInline />

      <div className={styles.actions}>
        <UiButton onClick={startScanner} disabled={isScanning || isPending}>
          {isScanning ? 'Сканирование...' : 'Сканировать'}
        </UiButton>
        <UiButton
          styleType="secondary"
          onClick={stopScanner}
          disabled={!isScanning}
        >
          Остановить
        </UiButton>
      </div>

      <div className={styles.manualForm}>
        <UiInput
          label="Штрихкод"
          value={barcode}
          inputMode="numeric"
          placeholder="Введите код вручную"
          onChange={(event) => setBarcode(event.currentTarget.value)}
        />
        <UiButton onClick={lookupBarcode} loading={isPending}>
          Найти
        </UiButton>
      </div>

      {(scannerError || error) && (
        <UiTypography style={{ color: '#d92d20' }}>
          {scannerError || getLookupErrorMessage(error)}
        </UiTypography>
      )}

      {data && nutrition && (
        <UiFlex direction="column" gap="s">
          <UiCard inverse>
            <div className={styles.productPreview}>
              {data.imageUrl && (
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className={styles.productImage}
                />
              )}
              <UiFlex direction="column" gap="xxs">
                <UiTypography bold>{data.name}</UiTypography>
                {data.brand && (
                  <UiTypography size="small" type="label">
                    {data.brand}
                  </UiTypography>
                )}
                <UiTypography size="small" type="label">
                  КБЖУ указаны на 100 г
                </UiTypography>
              </UiFlex>
            </div>
          </UiCard>

          <UiInput
            label="Вес, г"
            type="number"
            min={1}
            value={grams}
            onChange={(event) =>
              setGrams(Number(event.currentTarget.value) || DEFAULT_GRAMS)
            }
          />

          <div className={styles.nutritionGrid}>
            <NutritionCard label="Калории" value={nutrition.calories ?? 0} />
            <NutritionCard label="Белки" value={nutrition.protein ?? 0} />
            <NutritionCard label="Жиры" value={nutrition.fat ?? 0} />
            <NutritionCard label="Углеводы" value={nutrition.carbs ?? 0} />
          </div>

          <UiButton onClick={applyProduct}>Использовать продукт</UiButton>
        </UiFlex>
      )}
    </UiFlex>
  );
};
