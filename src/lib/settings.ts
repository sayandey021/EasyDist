import { z } from 'zod';

export const settingsKey = 'distro-accel-settings';

export const settingsSchema = z.object({
    authorName: z.string().optional(),
    authorEmail: z.string().optional(),
    publisher: z.string().optional(),
});

export type SettingsData = z.infer<typeof settingsSchema>;
