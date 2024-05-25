'use server';

import * as z from 'zod';
import { uploadFormSchema } from '@/utils/validation-schema/upload-form-schema';

type FormSchema = z.infer<typeof uploadFormSchema>;

export type FormState = {
  message: string;
};

export async function uploadAction(data: FormData) {
  console.log(data.get('uploadType'));
  const validation = uploadFormSchema.safeParse(Object.fromEntries(data));

  //TODO: Implement the upload action
  console.log(validation);
  console.log(data);

  if (!validation.success) {
    return {
      message: 'Invalid form data',
    };
  }
}
