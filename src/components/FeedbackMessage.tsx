import { Check, CircleAlert } from 'lucide-react'
import type { FeedbackMessageProps } from '../types'

export default function FeedbackMessage({ message, kind }: FeedbackMessageProps) {
  return (
    <p
      className={`feedback-message mb-4 flex items-start gap-2 rounded-md px-3 py-3 text-xs leading-relaxed ${
        kind === 'success' ? 'bg-piaui-verde/10 text-piaui-verde' : 'bg-red-50 text-red-900'
      }`}
      role={kind === 'error' ? 'alert' : 'status'}
    >
      {kind === 'success'
        ? <Check className="shrink-0" size={18} aria-hidden="true" />
        : <CircleAlert className="shrink-0" size={18} aria-hidden="true" />}
      {message}
    </p>
  )
}
