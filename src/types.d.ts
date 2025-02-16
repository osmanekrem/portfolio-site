import { loginSchema, projectSchema } from "@/lib/validations";

type LoginFormValues = z.infer<typeof loginSchema>;

type ProjectFormValues = z.infer<typeof projectSchema>;
