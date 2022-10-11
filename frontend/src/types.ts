export type UserInfo = {
  uid: number;
  userName: string;
};

// export type MessageWhereUniqueInput = {
//   id?: number
// }

// export type Message = {
//   id: number
//   userId: number
//   text: string
//   createdAt: Date
// }

// export type MessageCreateInput = {
//   user: UserCreateNestedOneWithoutMessagesInput
//   text: string
//   createdAt?: Date | string
// }

// export type UserCreateNestedOneWithoutMessagesInput = {
//   connect?: UserWhereUniqueInput
// }

// export type UserWhereUniqueInput = {
//   id?: number
//   email?: string
// }

export interface JwtPayloadN {
  id: number;
  email: string;
}