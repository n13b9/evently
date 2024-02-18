import { z } from "zod"

export const EventFormSchema = z.object({
    title:z.string().min(3,'Title must be at least 3 char'),
    description:z.string().min(3,'Description must be at least 3 char').max(400,"not more than 400 char"),
    location:z.string().min(3,'Description must be at least 3 char').max(400,"not more than 400 char"),
    imageUrl:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    categoryId:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url()
  })