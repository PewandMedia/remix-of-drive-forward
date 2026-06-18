import { CONTACT } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 3 17.4L1.5 23l5.8-1.5A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.4.9.9-3.3-.2-.4A9 9 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6 0a7.4 7.4 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6l.5-.6.2-.4a.5.5 0 0 0 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.3 1 2.6 1.1 2.8s1.9 3 4.6 4.2c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}