import { type ITranslationStructure } from './locales/translationStructure'

export type IAvailableLanguages = 'en' | 'es'
export type IAvailableLanguagesConfig = Record<IAvailableLanguages, { translationFile: ITranslationStructure }>
export type ITranslationsKeys = keyof Omit<ITranslationStructure, 'errors'> | `errors.${keyof ITranslationStructure['errors']}`

export function getTranslationKey (key: ITranslationsKeys): string {
  return key
}

export type Ii18nOptions = Record<string, string | number>

export abstract class I18NService {
  protected abstract defaultLanguage: IAvailableLanguages
  protected abstract availableLanguages: IAvailableLanguagesConfig

  public abstract currentLanguage: IAvailableLanguages

  /**
    CONVECTION: keywords of translation inside {{ }} and in uppercase need an interpolation value

    @example
    translate('{{FIELD}}MustHaveAtLeast{{X}}Characters', {FIELD: 'Full name', X: '5'})
    /*
      FIELD and X are interpolation value
      in this case 'FIELD='Full name' and X='5'
    /*
  */
  public abstract translate (translationKey: ITranslationsKeys, options?: Ii18nOptions): string
  public abstract getLanguages (): IAvailableLanguages[]
  public abstract isAvailableLanguage (lang: string): boolean
  public abstract changeLanguage (lang: IAvailableLanguages): void
}
