import z from "zod";

const EmailSchema = z.object({
  email: z
    .string({ required_error: "Enter an email or a phone number" })
    .email({ message: "Enter a valid email or phone number" }),
});
const PasswordSchema = z.object({
  password: z.string({ required_error: "Enter a password" }),
});

const FormSchema = EmailSchema.merge(PasswordSchema);

type EmailSchemaType = z.infer<typeof EmailSchema>;
type PasswordSchemaType = z.infer<typeof PasswordSchema>;
type FormSchemaType = z.infer<typeof FormSchema>;

export { EmailSchema, PasswordSchema, FormSchema };
export type { EmailSchemaType, PasswordSchemaType, FormSchemaType };
