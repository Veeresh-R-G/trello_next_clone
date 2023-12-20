import {z} from "zod"

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Title is Required",
        invalid_type_error: "Title is Required"
    }).min(3,{
        message:"Title is too Short"
    }),
    image: z.string({
        required_error: "Image is Required",
        invalid_type_error: "Image is Required"
    })
})