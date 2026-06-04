import type { TProductByBarcode } from '@/e.entities/product';
import { api } from '@/f.shared/api';

export const getProductByBarcodeApi = async (barcode: string) => {
  const response = await api.get<TProductByBarcode>(
    `/products/barcode/${barcode}`,
  );

  return response.data;
};
