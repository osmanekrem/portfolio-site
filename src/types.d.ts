import { loginSchema, projectSchema, postSchema } from "@/lib/validations";

type LoginFormValues = z.infer<typeof loginSchema>;

type ProjectFormValues = z.infer<typeof projectSchema>;

type PostFormValues = z.infer<typeof postSchema>;
