import type { JobApplication } from "./forms/jobApplication/schema";

// GET /api/check-email — para useAsyncValidation
export async function checkEmail(email: string): Promise<{ available: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) return reject(new Error('500'));
      const isAvailable = Math.random() > 0.7;
      resolve({ available: isAvailable });
    }, 1000);
  });
}

// POST /api/apply — simula 2s de delay + error aleatorio
export async function submitApplication(data: JobApplication): Promise<{ success: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Submitting application: ${JSON.stringify(data)}`);
      if (Math.random() < 0.3) return reject(new Error('500'));
      resolve({ success: true });
    }, 2000);
  });
}