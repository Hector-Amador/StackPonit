export default function Footer() {
    return (
        <footer className="flex justify-center py-4 gap-xl">
            <a className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
               href="#">
                <span className="material-symbols-outlined text-[18px]" data-icon="help">help</span>
                Centro de Ayuda
            </a>
            <a className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
               href="#">
                <span className="material-symbols-outlined text-[18px]" data-icon="privacy_tip">privacy_tip</span>
                Política de Privacidad
            </a>
        </footer>
    )
}