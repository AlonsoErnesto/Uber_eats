import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/modules/common/dtos/output.dto";
import { Verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

@InputType()
export class VerifyEmailInput extends PickType(Verification,['code']){}