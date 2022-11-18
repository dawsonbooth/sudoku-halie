import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import en from './en.json'

const i18n = new I18n({ en }, { locale: Localization.locale, enableFallback: true })

export default i18n
