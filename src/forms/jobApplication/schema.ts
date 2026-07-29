import { z } from 'zod';

export const schemaPersonalInfo = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.email(),
  phone: z.e164({ message: "Invalid phone number '+YYXXXXXXXXXXXXX'" }),
  linkedinURL: z.httpUrl().includes('linkedin.com').optional(),
  portfolioURL: z.httpUrl().optional()
})

export const schemaExperience = z.array(
  z.object({
    companyName: z.string().min(1, 'Company name is required'),
    role: z.string().min(1, 'Role is required'),
    startDate: z.coerce.date().refine(
      (date) => !isNaN(date.getTime()),
      { message: "Must be a valid date" }
    ),
    endDate: z.coerce.date().optional().refine(
      (date) => !isNaN(date?.getTime() || 0),
      { message: "Must be a valid date" }
    ),
    currentlyWorking: z.boolean(),
    description: z.string().min(50, 'Min 50 characters').max(500, 'Max 500 characters')
  }).superRefine((data, ctx) => {
    if (data.currentlyWorking) return;
    if (!data.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date is required",
        path: ["endDate"],
      });
      return;
    }
    if (data.startDate >= data.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "Start date must be before end date",
        path: ["endDate"],
      });
    }
  })
);

const schemaSkills = z.array(
  z.string().min(1)
).min(3, 'Too few skills').max(10, 'Too many skills');

const MAX_FILE_SIZE = 5242880; // 5MB in bytes
const ACCEPTED_TYPE = "application/pdf";

const resumeSchema = z
  .instanceof(File, { message: "Please select a valid file." })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_TYPE === file.type,
    ".pdf file is accepted."
  ).optional();

const coverSchema = z.string().max(1024, 'Too large').optional();

const termsSchema = z.literal(true);

export const jobApplicationSchema = z.object({
  personalInfo: schemaPersonalInfo,
  experiences: schemaExperience,
  skills: schemaSkills,
  resume: resumeSchema,
  coverLetter: coverSchema,
  terms: termsSchema,
})

export type JobApplication = z.input<typeof jobApplicationSchema>;
export type JobApplicationOutput = z.output<typeof jobApplicationSchema>;