import { Module, Provider } from '@nestjs/common'
import { i18nDiTypes } from './i18nDiTypes'
import { I18NNextService } from './i18nServiceImpl'

const i18nProvider: Provider = {
  provide: i18nDiTypes.I18N,
  useClass: I18NNextService
}

@Module({
  providers: [i18nProvider],
  exports: [i18nProvider]
})
export class I18NModule {}
