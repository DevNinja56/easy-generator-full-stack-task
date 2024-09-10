import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
})
export class Users extends Document {
  @Prop({
    type: "string",
    required: true,
  })
  name: string;

  @Prop({
    type: "string",
    required: false,
    default: "example@email.com",
  })
  email: string;

  @Prop({
    type: "string",
    default: null,
    required: false,
  })
  password: string;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
