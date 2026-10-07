import { z } from "zod";

/**
 * Esquema del formulario compartido entre cliente y servidor.
 * Los mensajes de error son claves de traducción (form.errors.*).
 * El formulario NO pide ni acepta información de pacientes (PHI).
 */
export const PROVIDER_OPTIONS = ["1", "2-5", "6-15", "16+"] as const;
export const CONTRACT_OPTIONS = ["ffs", "hmo", "full_risk", "unsure"] as const;
export const SERVICE_OPTIONS = ["audit", "rcm", "coder", "projects", "credentialing", "unsure"] as const;

const text = (max: number) => z.string().trim().min(1, "required").max(max, "tooLong");

/**
 * Detección conservadora de posibles datos de pacientes en el mensaje libre:
 * números de seguro social, identificadores de Medicare (MBI), fechas
 * (posibles fechas de nacimiento) y menciones explícitas.
 */
const PHI_PATTERNS: RegExp[] = [
  /\b\d{3}-\d{2}-\d{4}\b/, // SSN con guiones
  /\b\d{9}\b/, // 9 dígitos seguidos (SSN / n.º de póliza)
  /\b[1-9][AC-HJKMNP-RT-Y][AC-HJKMNP-RT-Y0-9]\d[AC-HJKMNP-RT-Y][AC-HJKMNP-RT-Y0-9]\d[AC-HJKMNP-RT-Y]{2}\d{2}\b/i, // MBI
  /\b(0?[1-9]|1[0-2])[/-](0?[1-9]|[12]\d|3[01])[/-](19|20)\d{2}\b/, // MM/DD/AAAA
  /\b(0?[1-9]|[12]\d|3[01])[/-](0?[1-9]|1[0-2])[/-](19|20)\d{2}\b/, // DD/MM/AAAA
  /\b(DOB|D\.O\.B|date of birth|fecha de nacimiento|f\. ?nac|SSN|social security|seguro social|MRN|medical record number|member id)\b/i,
];

export function containsPossiblePhi(value: string) {
  return PHI_PATTERNS.some((re) => re.test(value));
}

export const contactSchema = z.object({
  name: text(100),
  role: text(100),
  clinic: text(150),
  city: text(80),
  phone: z
    .string()
    .trim()
    .min(1, "required")
    .max(30, "tooLong")
    .refine((v) => v.replace(/\D/g, "").length >= 10 && /^[+\d\s().-]+$/.test(v), "phone"),
  email: z.string().trim().min(1, "required").max(160, "tooLong").pipe(z.email("email")),
  providers: z.enum(PROVIDER_OPTIONS, "invalidOption"),
  contract: z.enum(CONTRACT_OPTIONS, "invalidOption"),
  service: z.enum(SERVICE_OPTIONS, "invalidOption"),
  message: z
    .string()
    .trim()
    .max(1000, "tooLong")
    .refine((v) => !containsPossiblePhi(v), "phi")
    .optional()
    .default(""),
  consent: z.literal(true, "consent"),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrorKey = "required" | "email" | "phone" | "tooLong" | "invalidOption" | "consent" | "phi";

export function fieldErrors(error: z.ZodError): Partial<Record<ContactField, ContactErrorKey>> {
  const out: Partial<Record<ContactField, ContactErrorKey>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField;
    if (!field || out[field]) continue;
    const known: ContactErrorKey[] = ["required", "email", "phone", "tooLong", "invalidOption", "consent", "phi"];
    out[field] = known.includes(issue.message as ContactErrorKey) ? (issue.message as ContactErrorKey) : "required";
  }
  return out;
}
