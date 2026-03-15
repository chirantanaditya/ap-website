'use client'

import { useState, useActionState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { submitRSVP, type RSVPState } from '@/app/actions/rsvp'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function InputLabel({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-body font-medium text-text-dark mb-1.5">
      {children}
      {required && <span className="text-text-dark ml-0.5" aria-label="required">*</span>}
    </label>
  )
}

function TextInput({
  id, name, type = 'text', placeholder, required, autoComplete,
}: {
  id: string; name: string; type?: string; placeholder?: string; required?: boolean; autoComplete?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="w-full min-h-[52px] rounded-xl border border-border bg-white px-4 py-3 text-base text-text-dark placeholder:text-text-light font-body focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:border-maroon transition-colors duration-200"
    />
  )
}

const NOT_ATTENDING_MESSAGE = 'Thank you for letting us know!'

function SuccessView({ message }: { message: string }) {
  const isNotAttending = message === NOT_ATTENDING_MESSAGE
  return (
    <div className="text-center py-12 flex flex-col items-center gap-5">
      <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7C1D2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <div>
        <h3 className="font-heading text-2xl sm:text-3xl italic text-text-dark font-light mb-2">
          {isNotAttending ? 'Thank you for letting us know!' : 'See you at the celebrations!'}
        </h3>
        <p className="text-text-mid font-body text-sm leading-relaxed max-w-xs mx-auto">
          {isNotAttending ? "We'll miss you." : message}
        </p>
      </div>
    </div>
  )
}

export type RSVPFormProps = {
  team: 'bride' | 'groom'
}

export default function RSVPForm({ team }: RSVPFormProps) {
  const [joining, setJoining] = useState<'yes' | 'no' | null>(null)
  const [state, formAction, isPending] = useActionState<RSVPState, FormData>(submitRSVP, null)
  const formRef = useRef<HTMLFormElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
      setJoining(null)
      document.getElementById('rsvp-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [state])

  const revealProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: 0.6, ease: EASE },
      }

  return (
    <section
      id="rsvp"
      className="px-5 pt-32 pb-16 sm:pt-32 sm:pb-20 max-w-2xl mx-auto"
      aria-label="RSVP form"
    >
      {/* Heading */}
      <motion.div className="text-center mb-10" {...revealProps}>
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-body mb-3">
          Kindly respond at the earliest.
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl italic text-text-dark font-light mb-3">
          RSVP
        </h2>
        <p className="text-sm text-text-mid font-body max-w-sm mx-auto">
          Let us know you&apos;re coming! Fill in the details below and we&apos;ll take care of the rest.
        </p>
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
        {...(reduced ? {} : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.7, ease: EASE, delay: 0.1 },
        })}
      >
        {/* Error banner */}
        {state && !state.success && (
          <div className="px-5 py-3 bg-red-50 border-b border-red-100 text-red-700 text-sm font-body" role="alert">
            {state.message}
          </div>
        )}

        {/* Success view */}
        {state?.success ? (
          <div id="rsvp-success" className="px-5">
            <SuccessView message={state.message} />
          </div>
        ) : (
          <form
            ref={formRef}
            action={formAction}
            noValidate
            className="px-5 py-6 flex flex-col gap-6"
          >
            <input type="hidden" name="team" value={team} />

            {/* Step 1: Name + Will you be joining? */}
            <div>
              <InputLabel htmlFor="name" required>Your Full Name</InputLabel>
              <TextInput id="name" name="name" placeholder="e.g. Michael Scott" required autoComplete="name" />
            </div>

            <fieldset>
              <legend className="text-sm font-body font-medium text-text-dark mb-1">
                Will you be joining the celebrations?
                <span className="text-text-dark ml-0.5" aria-label="required">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  { value: 'yes' as const, label: 'Yes' },
                  { value: 'no' as const, label: 'No' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center justify-center gap-2.5 min-h-[52px] rounded-xl border border-border bg-cream cursor-pointer hover:border-maroon/40 hover:bg-cream-dark transition-colors duration-150 px-4 py-3 text-sm font-body font-medium text-text-dark has-checked:bg-maroon/5 has-checked:border-maroon has-checked:text-text-dark"
                  >
                    <input
                      type="radio"
                      name="joining"
                      value={opt.value}
                      required
                      checked={joining === opt.value}
                      onChange={() => setJoining(opt.value)}
                      className="sr-only"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Step 2a: Rest of form when Yes */}
            {joining === 'yes' && (
              <>
                <div>
                  <InputLabel htmlFor="phone">Phone Number <span className="text-text-light font-normal">(optional)</span></InputLabel>
                  <TextInput id="phone" name="phone" type="tel" placeholder="9999999999" autoComplete="tel" />
                </div>

                <div>
                  <InputLabel htmlFor="guests" required>Number of Guests Attending</InputLabel>
                  <select
                    id="guests"
                    name="guests"
                    required
                    defaultValue="1"
                    className="w-full min-h-[52px] rounded-xl border border-border bg-white px-4 py-3 text-base text-text-dark font-body focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:border-maroon transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className="text-sm font-body font-medium text-text-dark mb-1">
                    Do you need accommodation?
                    <span className="text-text-dark ml-0.5" aria-label="required">*</span>
                  </legend>
                  <p className="text-xs text-text-light font-body mb-3">
                    Check-in: 28 April (Tuesday) · Check-out: 1 May (Friday)
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ value: 'yes', label: 'Yes, please!' }, { value: 'no', label: "No, I'm sorted" }].map((opt) => (
                      <label
                        key={opt.value}
                        className="flex items-center justify-center gap-2.5 min-h-[52px] rounded-xl border border-border bg-cream cursor-pointer hover:border-maroon/40 hover:bg-cream-dark transition-colors duration-150 px-4 py-3 text-sm font-body font-medium text-text-dark has-checked:bg-maroon/5 has-checked:border-maroon has-checked:text-text-dark"
                      >
                        <input
                          type="radio"
                          name="accommodation"
                          value={opt.value}
                          required
                          className="sr-only"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="arrivalDate">Date of arrival <span className="text-text-light font-normal">(optional)</span></InputLabel>
                    <input
                      id="arrivalDate"
                      name="arrivalDate"
                      type="date"
                      min="2025-04-28"
                      max="2025-05-01"
                      className="w-full min-h-[52px] rounded-xl border border-border bg-white px-4 py-3 text-base text-text-dark font-body focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:border-maroon transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <InputLabel htmlFor="arrivalTime">Time of arrival <span className="text-text-light font-normal">(optional)</span></InputLabel>
                    <input
                      id="arrivalTime"
                      name="arrivalTime"
                      type="time"
                      className="w-full min-h-[52px] rounded-xl border border-border bg-white px-4 py-3 text-base text-text-dark font-body focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:border-maroon transition-colors duration-200"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Message (shown for both Yes and No) */}
            {(joining === 'yes' || joining === 'no') && (
              <div>
                <InputLabel htmlFor="message">
                  {joining === 'yes'
                    ? <>Anything else? <span className="text-text-light font-normal">(optional)</span></>
                    : <>Anything you&apos;d like to say? <span className="text-text-light font-normal">(optional)</span></>
                  }
                </InputLabel>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={joining === 'no' ? "We'll miss you! Leave a note if you'd like…" : "Dietary requirements, questions, or just a warm note…"}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-text-dark placeholder:text-text-light font-body focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:border-maroon transition-colors duration-200 resize-none leading-relaxed"
                />
              </div>
            )}

            {/* Submit: only when joining is chosen */}
            {joining !== null && (
              <>
                {joining === 'no' && (
                  <p className="text-sm text-text-mid font-body text-center -mt-2">
                    We&apos;ll miss you! Thanks for letting us know.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-[56px] bg-maroon text-cream font-body font-medium text-sm tracking-[0.12em] uppercase rounded-full px-8 py-4 transition-all duration-300 hover:bg-maroon-light active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-maroon focus-visible:outline-offset-2 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2 A10 10 0 0 1 22 12" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Confirm RSVP'
                  )}
                </button>
                <p className="text-xs text-text-light font-body text-center">
                  {joining === 'yes' && <>Fields marked <span className="text-text-dark">*</span> are required.</>}
                </p>
              </>
            )}
          </form>
        )}
      </motion.div>
    </section>
  )
}
