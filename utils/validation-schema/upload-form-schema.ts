import * as z from 'zod';

// youtube link validation regex
const ytRegex =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

export const uploadFormSchema = z
  .object({
    uploadType: z.enum(['url', 'file']),
    // If the zod schema is used on the backend, the zod type will be any because window will be undefined.
    file:
      typeof window === 'undefined' ? z.any() : z.instanceof(File).optional(),
    url: z.coerce.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.uploadType === 'url') {
      if (!data.url) {
        ctx.addIssue({
          path: ['url'],
          message: 'URL is required',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!ytRegex.test(data.url ?? '')) {
        ctx.addIssue({
          path: ['url'],
          message: 'Invalid youtube URL',
          code: z.ZodIssueCode.custom,
        });
      }
      return data.url;
    }
    if (data.uploadType === 'file') {
      if (!data.file) {
        ctx.addIssue({
          path: ['file'],
          message: 'File is required',
          code: z.ZodIssueCode.custom,
        });
      }
      return data.file;
    }
  });
