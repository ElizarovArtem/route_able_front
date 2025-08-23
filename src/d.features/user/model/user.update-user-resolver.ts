import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const avatarFileSchema = z.object({
  name: z.string(),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(5 * 1024 * 1024, 'Файл слишком большой (макс. 5MB)'),
});

const createUpdateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  about: z.string().optional(),
  isCoach: z.boolean().optional(),
  avatar: z.any().optional(),
});

export type TUpdateUserFormData = z.infer<typeof createUpdateUserSchema>;

export const updateUserFormResolver = zodResolver(createUpdateUserSchema);
