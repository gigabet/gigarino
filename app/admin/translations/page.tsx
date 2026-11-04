import { loadTranslations } from '@/app/admin/translations/github-translations'
import TranslationEditor from '@/app/admin/translations/translation-editor'

export const dynamic = 'force-dynamic'

export default async function TranslationsPage() {
  const { dict } = await loadTranslations()
  return <TranslationEditor initial={dict} />
}
