import { Inject, Injectable } from '@nestjs/common'
import { CONFIG_OPTIONS } from '../common/common.constants'
import { EmailVar, MailModuleOptions } from './mail.interface'
import got from 'got'
import * as FormData from 'form-data'

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  //Funcion para enviar Email
  private async sendEmail(
    subject: string,
    template: string,
    emailVariables: EmailVar[],
  ) {
    const form = new FormData()
    form.append(
      'from',
      `Cludia de Uber Eats <ernesto134alonso123@${this.options.domain}>`,
    )
    form.append('to', 'claudia@gmail.com')
    form.append('subject', subject)
    form.append('template', template)
    emailVariables.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value))
    form.append('v:username', 'ernesto')
    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      })
    } catch (error) {
      console.log(error)
    }
  }

  sendVeriticationEmail(email: string, code: string) {
    this.sendEmail('Verify your email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ])
  }
}
