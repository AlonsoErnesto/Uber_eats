import { Module, DynamicModule, Global } from '@nestjs/common'
import { CONFIG_OPTIONS } from '../common/common.constants'
import { MailModuleOptions } from './mail.interface'
import { MailService } from './mail.service'

@Module({})
@Global()
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    }
  }
}
