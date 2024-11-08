import i18next, { type Resource } from 'i18next'
import { I18NService, type IAvailableLanguages, type IAvailableLanguagesConfig, type ITranslationsKeys, type Ii18nOptions, localeEN, localeES } from '../domain'
import { isDevelopmentENV } from '../../../../shared/domain'

export class I18NNextService extends I18NService {
  public currentLanguage: IAvailableLanguages = 'en'
  protected defaultLanguage: IAvailableLanguages = 'en'

  /*
    To add a new language just add one more element to the object
    with its translation file.
  */
  protected availableLanguages: IAvailableLanguagesConfig = {
    en: {
      translationFile: localeEN
    },
    es: {
      translationFile: localeES
    }
  }

  constructor () {
    super()
    void this.init()
  }

  translate (key: ITranslationsKeys, options?: Ii18nOptions): string {
    return i18next.t(key, options).toString()
  }

  private async init (): Promise<void> {
    // transform availableLanguages to i18next resources
    const resources: Resource = {}
    const resourcesKeys = Object.keys(this.availableLanguages) as IAvailableLanguages[]

    resourcesKeys.forEach((k: IAvailableLanguages) => {
      Object.defineProperty(resources, k, {
        value: {
          translation: this.availableLanguages[k].translationFile
        }
      })
    })

    await i18next.init({
      fallbackLng: ['en', 'es'],
      debug: isDevelopmentENV,
      resources,
      saveMissing: true,
      parseMissingKeyHandler: () => '' // if a key doesn't exist '' will be returned instead
    })
  }

  getLanguages (): IAvailableLanguages[] {
    return Object.keys(this.availableLanguages) as IAvailableLanguages[]
  }

  // case insensitive
  isAvailableLanguage (lang: string): boolean {
    return this.getLanguages()
      .map(l => l.toLocaleLowerCase())
      .includes(lang.toLowerCase())
  }

  // case insensitive
  async changeLanguage (lang: IAvailableLanguages): Promise<void> {
    const langFound = this.getLanguages().find(l => l.toLocaleLowerCase() === lang.toLocaleLowerCase())
    await i18next.changeLanguage(langFound)
    this.currentLanguage = lang
  }
}
