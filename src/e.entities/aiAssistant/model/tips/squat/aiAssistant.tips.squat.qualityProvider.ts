import { makeCameraQualityProvider } from '../aiAssistant.tips.quality.ts';

export const cameraQualityProvider = makeCameraQualityProvider({
  missing:
    'Камера видит не все ключевые точки. Отойди чуть дальше и держи тело в кадре полностью.',
  lowQuality:
    'Качество распознавания низкое. Улучши освещение или повернись к камере выбранным ракурсом.',
});
