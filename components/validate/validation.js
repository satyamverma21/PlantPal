
import z from 'zod'


const formSignupSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const formloginSchema = z.object({
    username: z.string().min(1, { message: "Please enter username" }),
    password: z.string().min(1, { message: "Please enter password" }),
});



export { formSignupSchema, formloginSchema }
