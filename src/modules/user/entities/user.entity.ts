import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CoreEntity } from 'src/modules/common/entities/core.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common'
import { IsEmail, IsEnum } from 'class-validator'

enum UserRole {
  Client,
  Owner,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string

  @Column({ select: false })
  @Field(() => String)
  password: string

  @Column({ type: 'enum', enum: UserRole })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole

  @Column({ default: false })
  @Field(() => Boolean)
  verified: boolean

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
      } catch (e) {
        throw new InternalServerErrorException()
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = bcrypt.compare(aPassword, this.password)
      return ok
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
