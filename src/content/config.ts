import { defineCollection, z } from 'astro:content';

const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string().optional(),
    updatedDate: z.string().optional(),
  }),
});

export const collections = {
  legal,
};

