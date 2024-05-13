
import z, { boolean } from 'zod'


const formSignupSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const formloginSchema = z.object({
    username: z.string().min(1, { message: "Please enter username" }),
    password: z.string().min(1, { message: "Please enter password" }),
});

const sellPantSchema = z.object({
    name: z.string().min(1, { message: "Plant name required" }),
    price: z.string().min(1, { message: "Plant price is required" }),
    contact: z.string().min(1, { message: "Contact information required" }),
    additional: z.string().min(1, { message: "Additional information required" }),
})



export { formSignupSchema, formloginSchema, sellPantSchema }
