# Job Application Form — Tareas

Stack: React + TypeScript + React Hook Form + Zod + Tailwind CSS v4

---

## Progreso

| # | Tarea | Estado |
|---|-------|--------|
| 1 | Setup del proyecto | ✅ Completo |
| 2 | Estudiar: Zod — schema validation | ✅ Completo |
| 3 | Estudiar: Arquitectura de componentes reutilizables | ✅ Completo |
| 4 | Estudiar: Custom hooks | ✅ Completo |
| 5 | Estudiar: React Hook Form | ✅ Completo |
| 6 | Estudiar: useFieldArray | ✅ Completo |
| 7 | Implementar: Skills selector | ✅ Completo |
| 8 | Implementar: File upload + Cover letter | ✅ Completo |
| 9 | Implementar: Submit + error handling | ✅ Completo |
| 10 | Implementar: Dirty state + analytics | ✅ Completo |
| 11 | Revisión final: accesibilidad + race conditions | ⬜ Pendiente |
| 12 | Tailwind CSS + design system | ✅ Completo |
| 13 | Implementar: ErrorSummary | ⬜ Pendiente |
| 14 | Implementar: Accesibilidad componentes custom | ⬜ Pendiente |
| 15 | Implementar: Toasts + aria-live | ⬜ Pendiente |
| 16 | Verificar: contraste + herramientas a11y | ⬜ Pendiente |
| 17 | Bonus: Migrar mock API a tRPC | ⬜ Pendiente |
| 18 | Bonus: Migrar estado a Zustand | ⬜ Pendiente |
| 19 | Bonus: API route Next.js — POST con NextResponse y validación Zod | ⬜ Pendiente |
| 20 | Refactor: Spinner real + TermsCheckbox como componente | ✅ Completo |
| 21 | Estilos: Aplicar Tailwind a todos los componentes según diseño Figma | ✅ Completo |
| 22 | UX: View/Edit mode para experiencias laborales | ⬜ Pendiente |

---

## Detalle de tareas

### ✅ 1 — Setup del proyecto
Vite + React + TypeScript + React Hook Form + Zod + Tailwind CSS v4 instalados y configurados.
Estructura de carpetas: `/forms/jobApplication`, `/components/form`, `/hooks`.

---

### ✅ 2 — Estudiar: Zod
Schema completo en `src/forms/jobApplication/schema.ts`.

Conceptos cubiertos: `z.object`, `z.array`, `z.coerce.date`, `z.literal`, `z.infer`, `.superRefine`, `.optional`, cross-field validation.

---

### ⬜ 3 — Estudiar: Arquitectura de componentes reutilizables

Entender qué hace que un componente de formulario sea verdaderamente reutilizable.

Conceptos clave:
- Compound components pattern
- Cómo conectar `register()` de RHF con un input custom sin perder la ref
- Por qué `aria-invalid`, `aria-describedby` y `htmlFor` son obligatorios
- Diferencia entre controlled y uncontrolled en el contexto de RHF

Lo que hay que poder responder:
> ¿Por qué RHF prefiere uncontrolled inputs? ¿Qué pasa con el rendimiento si usás controlled?

Recursos:
- https://echobind.com/post/building-reusable-react-hook-form-components
- https://www.w3.org/WAI/tutorials/forms/
- https://kentcdodds.com/blog/compound-components-with-react-hooks
- Video: https://www.youtube.com/watch?v=DnwmS6qWvW4
- Video: https://www.youtube.com/watch?v=e7KRxiXlGE4

Componentes a construir:
- `FormField.tsx` — orquestador, conecta label + input + error
- `TextInput.tsx`
- `SelectInput.tsx`
- `ErrorMessage.tsx`
- `FileUpload.tsx`

---

### ✅ 4 — Estudiar: Custom hooks

Conceptos clave:
- `useEffect` con cleanup para evitar memory leaks
- `useRef` vs `useState` para valores que no deben causar re-render
- Closure stale problem y cómo resolverlo con `useRef`
- `beforeunload` event para dirty state

Hooks a construir:
- `useAutosave(value, delay)` — guarda en localStorage cada 2s
- `usePreventNavigation(isDirty)` — alerta "You have unsaved changes"
- `useDebounce(value, delay)` — utilitario base
- `useAsyncValidation(email)` — valida email contra mock API

Recursos:
- https://react.dev/learn/reusing-logic-with-custom-hooks
- https://overreacted.io/a-complete-guide-to-useeffect/
- https://kettanaito.com/blog/debounce-vs-throttle
- Video: https://www.youtube.com/watch?v=6ThXsUwLWvc
- Video: https://www.youtube.com/watch?v=QQYeipc_cik

---

### ✅ 5 — Estudiar: React Hook Form

`JobApplicationForm.tsx` creado con `useForm`, `zodResolver`, `FormProvider` y sección de datos personales.
Fix en `FormField.tsx`: path getter para errores anidados (`errors.personalInfo.firstName` en lugar de `errors["personalInfo.firstName"]`).

Conceptos clave:
- `useForm()` con `mode: 'onBlur'`, `resolver`, `defaultValues`
- `register()` para inputs nativos
- `watch()` vs `getValues()` — diferencia de rendimiento
- `formState`: `isDirty`, `isSubmitting`, `isValid`, `errors`
- Async validation con `validate` vs `setError()`
- Race conditions en async validation

Lo que hay que poder responder:
> ¿Por qué `mode: 'onBlur'` es mejor UX que `'onChange'` en un form de aplicación laboral?

Recursos:
- https://react-hook-form.com/docs/useform
- https://react-hook-form.com/docs/useform/register#validate
- https://react-hook-form.com/advanced-usage#FormProviderPerformance
- Video: https://www.youtube.com/watch?v=cc_xmawJ8Kg
- Video: https://www.youtube.com/watch?v=CC9l3oNT0Ts

---

### ✅ 6 — Estudiar: useFieldArray

Conceptos clave:
- `useFieldArray`: `append`, `remove`, `fields` — cómo funciona internamente
- Por qué cada item necesita un `id` estable
- Nested validation con Zod: `z.array(z.object({...}).superRefine(...))`
- Cómo RHF mapea errores: `errors.experiences[0].endDate`

Edge case a pensar:
> ¿Qué pasa si el usuario marca `currentlyWorking = true` y después lo desmarca?

Recursos:
- https://react-hook-form.com/docs/usefieldarray
- https://zod.dev/?id=arrays
- https://zod.dev/?id=superrefine
- Video: https://www.youtube.com/watch?v=0Ys740aIHQA
- Video: https://www.youtube.com/watch?v=zgGHm-ZmRxw

---

### ⬜ 7 — Implementar: Skills selector

Feature: selector multi-skill con lista predefinida + custom skills. Min 3, max 10. UI tipo chip/tag.

Lo que hay que resolver:
- Registrar array de strings en RHF con `Controller` o `setValue`
- Validación del array con Zod: `z.array(z.string().min(1)).min(3).max(10)`
- Triggerear re-validación al agregar/quitar un skill con `trigger()`
- Input de custom skill: enter para agregar, evitar duplicados, limpiar después

Recursos:
- https://react-hook-form.com/docs/usecontroller/controller
- https://react-hook-form.com/docs/usecontroller
- Video: https://www.youtube.com/watch?v=DnwmS6qWvW4

Prerequisito: tareas 3, 4, 5

---

### ⬜ 8 — Implementar: File upload + Cover letter

**Resume upload:**
- Validar tipo (`file.type === 'application/pdf'`) y tamaño (`file.size <= 5 * 1024 * 1024`) en Zod con `z.instanceof(File).refine(...)`
- El input `type="file"` retorna `FileList`, no `File`
- Mostrar nombre del archivo y botón para limpiar

**Cover letter:**
- `useAutosave`: guardar en localStorage cada 2s con debounce
- Recovery al montar: leer localStorage en `useEffect` y poblar con `setValue()`
- Contador de caracteres: `watch()` vs `useState` local — ¿cuál re-renderiza menos?
- Indicador "Saving..." / "Saved"

Recursos:
- https://zod.dev/?id=custom
- https://react-hook-form.com/docs/useform/register (sección FileList)
- https://usehooks.com/useLocalStorage

Prerequisito: tareas 3, 4, 5

---

### ⬜ 9 — Implementar: Submit + error handling

Lo que hay que resolver:
- `handleSubmit` de RHF: qué pasa si Zod falla vs. si falla el fetch
- `isSubmitting` para deshabilitar botón y mostrar spinner
- `setError('root')` para errores que no pertenecen a un campo
- Simular 3 escenarios: 500, timeout (AbortController), validation error backend
- Guardar draft en localStorage antes de llamar a la API

Mock API:
- `GET /api/check-email` → `{ available: boolean }` con 500ms delay
- `POST /api/apply` → success o error aleatorio con 2000ms delay

Recursos:
- https://react-hook-form.com/docs/useform/handlesubmit
- https://react-hook-form.com/docs/useform/seterror
- https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- https://tkdodo.eu/blog/react-query-error-handling
- Video: https://www.youtube.com/watch?v=MkNCkKomu_s

Prerequisito: tareas 5, 6, 7, 8

---

### ⬜ 10 — Implementar: Dirty state + analytics

**Dirty state:**
- `isDirty` de RHF: cuándo es true y cuándo vuelve a false
- `window.addEventListener('beforeunload')` para navegación nativa
- `useBlocker()` de React Router v6 para navegación interna
- Dialog: "You have unsaved changes. Are you sure?"

**Analytics:**
- Trackear tiempo de inicio (Date.now() al primer keypress)
- Trackear campos con errores en submit y cuántas veces falló cada uno

Recursos:
- https://reactrouter.com/en/main/hooks/use-blocker
- https://react-hook-form.com/docs/useform/formstate
- https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event

Prerequisito: tarea 9

---

### ⬜ 11 — Revisión final: accesibilidad + race conditions

**Checklist accesibilidad:**
- [ ] axe DevTools: 0 violations A y AA
- [ ] Todos los inputs tienen label asociado (`htmlFor` = `id`)
- [ ] Tab order lógico
- [ ] Formulario completable 100% sin mouse
- [ ] VoiceOver lee correctamente

**Checklist race conditions:**
- [ ] Async email validation con AbortController
- [ ] Double submit con `isSubmitting`
- [ ] Autosave + submit simultáneo

**Checklist rendimiento:**
- [ ] Sin `watch()` innecesario
- [ ] Callbacks con `useCallback`
- [ ] React DevTools Profiler en submit

Recursos:
- https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms
- https://react.dev/learn/react-developer-tools
- axe DevTools: https://www.deque.com/axe/devtools/

Prerequisito: tarea 10

---

### ✅ 12 — Tailwind CSS + design system
Tailwind v4 instalado con `@tailwindcss/vite`. Tokens definidos en `src/index.css` con `@theme`.
Archivo `tokens.json` generado para Token Studio en Figma.

---

### ⬜ 13 — Implementar: ErrorSummary

Componente que muestra todos los errores del form al hacer submit, con links a cada campo.

WCAG: 3.3.1 Error Identification, 3.3.3 Error Suggestion, 2.4.3 Focus Order

Lo que hay que resolver:
- Leer y aplanar todos los errores de `formState`
- Scroll automático al componente con `ref.scrollIntoView`
- Cada ítem es un link que mueve el focus al campo
- `role="alert"` para anuncio automático con lectores de pantalla
- Mostrar solo después del primer submit

Recursos:
- https://react-hook-form.com/docs/useform/formstate
- https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role
- https://design-system.service.gov.uk/components/error-summary/ ← referencia obligada

Prerequisito: tarea 9

---

### ⬜ 14 — Implementar: Accesibilidad componentes custom

**Skills chips:**
- `role="checkbox"` con `aria-checked` o button
- `aria-label="Remove React"` en botón de eliminar
- `aria-live="polite"` para anunciar cambios

**File upload:**
- `role="button"`, `tabIndex={0}`, responder a Enter/Space
- `aria-describedby` con nombre del archivo seleccionado

**useFieldArray:**
- Focus al primer campo al agregar experiencia
- `aria-label="Remove experience at [company]"` específico

WCAG: 1.3.1, 4.1.2, 2.1.1

Recursos:
- https://www.w3.org/WAI/ARIA/apg/patterns/button/
- https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
- https://react.dev/learn/manipulating-the-dom-with-refs

Prerequisito: tareas 7, 8

---

### ⬜ 15 — Implementar: Toasts + aria-live

Toast component liviano (sin librería) con variantes: success, error, info.
WCAG 4.1.3 Status Messages — el más ignorado en formularios React.

Lo que hay que resolver:
- `role="status"` para mensajes no urgentes, `role="alert"` para errores
- "sr-only announcer" — div invisible con `aria-live="polite"`
- Autosave indicator con `aria-live`

Recursos:
- https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
- https://www.smashingmagazine.com/2024/08/making-toast-notifications-accessible/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live

Prerequisito: tarea 9

---

### ⬜ 16 — Verificar: contraste + herramientas a11y

Herramientas:
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Lighthouse (Chrome DevTools → tab Accessibility)
- VoiceOver en Mac: Cmd + F5
- Contraste: https://webaim.org/resources/contrastchecker/

Checklist mínimo:
- [ ] axe DevTools: 0 violations A y AA
- [ ] neutral-400 (#a3a3a3) sobre blanco — verificar ratio
- [ ] error-600 (#dc2626) sobre error-50 (#fff1f2) — verificar ratio
- [ ] Tab order lógico de principio a fin
- [ ] 100% navegable sin mouse
- [ ] VoiceOver lee labels correctamente

WCAG: 1.4.3 Contrast (AA)

Prerequisito: tareas 13, 14, 15

---

### ⬜ 17 — Bonus: Migrar mock API a tRPC

Branch: `feature/trpc-migration`

Migrar `GET /api/check-email` y `POST /api/apply` a un router tRPC con type-safety de extremo a extremo.

Stack adicional: `@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@tanstack/react-query`

Recursos:
- https://trpc.io/docs/quickstart
- https://trpc.io/docs/client/react
- Video: https://www.youtube.com/watch?v=2LYM8gf184U

Prerequisito: tarea 16

---

### ⬜ 18 — Bonus: Migrar estado a Zustand

Branch: `feature/zustand-migration`

Migrar el estado del formulario de React Hook Form a Zustand + RHF en combinación.

Prerequisito: tarea 16

---

### ⬜ 20 — Refactor: Spinner real + TermsCheckbox como componente

**Spinner:**
- Reemplazar el `<p>Displaying spinner....</p>` en `jobApplicationForm.tsx` por un componente `<Spinner />` real
- SVG animado con `animate-spin` de Tailwind o CSS puro
- Usar dentro del botón de submit: `<button disabled={isSubmitting}>{isSubmitting ? <Spinner /> : 'Submit'}</button>`

**TermsCheckbox:**
- Extraer el checkbox de terms de `jobApplicationForm.tsx` a `src/components/form/TermsCheckbox.tsx`
- Usa `register('terms')` desde `useFormContext`
- Muestra el error de terms si existe
- Accesible: `htmlFor` + `id` + `aria-describedby`

Prerequisito: tarea 9

---

### ⬜ 21 — Estilos: Aplicar Tailwind a todos los componentes según diseño Figma

Aplicar las clases de Tailwind v4 usando los tokens del design system (`--color-primary-*`, `--color-neutral-*`, `--color-error-*`, etc.) a todos los componentes del formulario.

**Componentes a estilizar:**
- `FormField.tsx` — label, error span
- `TextInput.tsx` — border, focus ring, estado error (`border-error-500`, `shadow-focus`)
- `SelectInput.tsx` — igual que TextInput
- `FileUpload.tsx` — zona de drop, estado drag-over, nombre del archivo
- `ExperiencesSection.tsx` — card por experiencia, botones add/remove
- `SkillsSection.tsx` — chips predefinidos, chip seleccionado vs no seleccionado, input custom
- `UploadSection.tsx` — contador de caracteres, indicador autosave
- `TermsCheckbox.tsx` — checkbox + label
- `JobApplicationForm.tsx` — layout general, botón submit, error root
- `Spinner.tsx` (tarea 20)

**Estados a cubrir por input:**
- Default, focus, error, disabled

**Referencias:**
- `src/index.css` — tokens disponibles en `@theme`
- `tokens.json` — diseño original
- Figma: mockup de componentes armado en tarea 3

Prerequisito: tareas 9, 20

---

### ⬜ 22 — UX: View/Edit mode para experiencias laborales

Cada experiencia alterna entre modo vista (texto compacto) y modo edición (inputs).

**View mode muestra:**
```
Acme Corp — Frontend Developer
Jan 2022 - Currently working
```

**Comportamiento:**
- Al agregar una nueva experiencia, abre automáticamente en edit mode
- Botón "Edit" en view mode para volver a editar
- Botón "Save" o colapso al hacer click fuera (opcional)

**Approach sugerido — Accordion (un item abierto a la vez):**
```ts
const [editingIndex, setEditingIndex] = useState<number | null>(null)
// Al hacer append:
setEditingIndex(fields.length)
append({...})
```

**Formato de fecha:**
```ts
const formatDate = (date?: Date) =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''

`${formatDate(startDate)} - ${currentlyWorking ? 'Currently working' : formatDate(endDate)}`
```

**Lo que hay que resolver:**
- Los valores en view mode vienen de `watch(`experiences.${index}`)` — ¿por qué watch y no getValues?
- Al eliminar un item, resetear `editingIndex` si era el que estaba abierto

Prerequisito: tarea 6

---

### ⬜ 19 — Bonus: API route Next.js — POST con NextResponse y validación Zod

Crear un endpoint real en Next.js App Router que reciba los datos del formulario, los valide con Zod y devuelva respuestas tipadas.

**Contexto:** este proyecto usa Vite. Esta tarea vive en un mini proyecto Next.js separado o en un branch `feature/nextjs-api` para explorar cómo sería la contraparte backend.

**Lo que hay que construir:**

```
app/
  api/
    apply/
      route.ts     ← POST handler
    check-email/
      route.ts     ← GET handler
```

**`POST /api/apply`**

Lo que hay que resolver:
- Leer body con `request.json()`
- Validar con `jobApplicationSchema.safeParse(body)` — usar `safeParse`, no `parse`, para no lanzar excepciones
- Si falla: `NextResponse.json({ success: false, errors: result.error.flatten() }, { status: 422 })`
- Si pasa: simular delay de 2s con `await new Promise(res => setTimeout(res, 2000))` y devolver `{ success: true }`
- Simular error 500 aleatorio: `if (Math.random() < 0.3) return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })`

**`GET /api/check-email`**

- Leer query param: `const email = request.nextUrl.searchParams.get('email')`
- Validar formato con `z.string().email().safeParse(email)`
- Mock de emails ya registrados: `const takenEmails = ['test@test.com', 'admin@admin.com']`
- Responder: `{ available: boolean }`

**Tipos de respuesta a definir en `types.ts`:**
```ts
type ApiSuccess<T> = { success: true; data: T }
type ApiError = { success: false; message: string; errors?: ZodFormattedError<...> }
type ApiResponse<T> = ApiSuccess<T> | ApiError
```

**Lo que hay que poder responder:**
> ¿Por qué `safeParse` es mejor que `parse` en un API handler? ¿Qué diferencia hay entre `.flatten()` y `.format()` en los errores de Zod?

Recursos:
- https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- https://nextjs.org/docs/app/api-reference/functions/next-response
- https://zod.dev/?id=safeparse
- https://zod.dev/?id=error-handling
- Video: https://www.youtube.com/watch?v=gEB3ckYeZF4

Prerequisito: tarea 9
