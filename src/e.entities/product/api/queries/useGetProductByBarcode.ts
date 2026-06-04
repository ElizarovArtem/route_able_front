import { type MutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import {
  getProductByBarcodeApi,
} from '@/e.entities/product/api/requests/get-product-by-barcode.request.ts';
import type { TProductByBarcode } from '@/e.entities/product';

export const useGetProductByBarcode = (
  mutationOptions?: MutationOptions<TProductByBarcode, AxiosError, string>,
) => {
  return useMutation<TProductByBarcode, AxiosError, string>({
    mutationFn: getProductByBarcodeApi,
    ...mutationOptions,
  });
};
