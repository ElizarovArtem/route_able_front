import { makeCameraQualityProvider } from '../aiAssistant.tips.quality.ts';

export const pushupCameraQualityProvider = makeCameraQualityProvider({
  missing:
    'Камера видит не все точки. Поставь телефон сбоку и держи плечи, локти, кисти, таз и стопы в кадре.',
  lowQuality:
    'Распознавание нестабильное. Улучши освещение или отойди чуть дальше от камеры.',
});
