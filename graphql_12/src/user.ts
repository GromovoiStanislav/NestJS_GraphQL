import { ObjectType, Field, Int } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Post } from './post'
import { Profile } from "./profile";

@ObjectType()
export class User {
  @Field(type => Int)
  id: number

  @Field(type => String)
  @IsEmail()
  email: string

  @Field(type => String, { nullable: true })
  name?: string | null

  @Field(type => [Post], { nullable: true })
  posts?: [Post] | null

  @Field(type => Profile, { nullable: true })
  profile?: Profile | null
}