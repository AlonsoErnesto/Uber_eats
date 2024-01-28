import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LoginInput } from '../common/dtos/output.dto'
import { CreateAccountInput } from './dtos/create-account.dto'
import { User } from './entities/user.entity'
import { JwtService } from '../jwt/jwt.service'
import { EditProfileInput } from './dtos/edit-profile.dto'
import { Verification } from './entities/verification.entity'
import { VerifyEmailOutput } from './dtos/verify-email.dto'
import { MailService } from '../mail/mail.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } })
      if (exists) {
        return { ok: false, error: 'Este correo ya esta en uso.' }
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      )
      const verification = await this.verification.save(
        this.verification.create({
          user,
        }),
      )
      this.mailService.sendVeriticationEmail(user.email, verification.code)
      return { ok: true }
    } catch (e) {
      return {
        ok: false,
        error: 'Ocurrio un problema al crear la cuenta, vuelva a intentarlo.',
      }
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      })
      if (!user) {
        return {
          ok: false,
          error: 'Correo no registrado.',
        }
      }
      const passwordCorrect = await user.checkPassword(password)
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Contraseña incorrecta.',
        }
      }
      const token = this.jwtService.sign(user.id)
      return {
        ok: true,
        token,
      }
    } catch (error) {
      return {
        ok: false,
        error,
      }
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } })
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    // const user = await this.users.findOne({where:{userId}})
    const user = await this.users.findOne({ where: { id: userId } })
    if (email) {
      user.email = email
      user.verified = false
      const verification = await this.verification.save(
        this.verification.create({ user }),
      )
      this.mailService.sendVeriticationEmail(user.email, verification.code)
    }
    if (password) {
      user.password = password
    }
    return this.users.save(user)
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verification.findOne({
        where: { code },
        relations: ['user'],
      })
      if (verification) {
        verification.user.verified = true
        this.users.save(verification.user)
        await this.verification.delete(verification.id)
        return { ok: true }
      }
      return { ok: false, error: 'Hubo un problema al verificar.' }
    } catch (error) {
      return { ok: true }
    }
  }
}
