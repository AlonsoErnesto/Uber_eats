import { DynamicModule, Module, Global } from '@nestjs/common'
import { CONFIG_OPTIONS } from '../common/common.constants'
import { JwtModuleOptions } from './jwt.interfaces'
import { JwtService } from './jwt.service'

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    }
  }
}
