import { enumType, extendType, list, nonNull, objectType, stringArg } from "nexus";
import bcrypt from 'bcrypt'
import { decodedToken, generateToken } from "../token";
import { sendRestEmail, sendVerifyEmail } from "../utils/mailer";

export const UserRoleEnum = enumType({
  description: '用户角色枚举',
  name: 'UserRoleEnum',
  members: {
    DEVELOPER: 'DEVELOPER',
    TRANSLATOR: 'TRANSLATOR',
    MANAGER: 'MANAGER',
    OTHER: 'OTHER'
  }
})

export const IUser = objectType({
  name: 'UserInfo',
  description: "用户基本信息",
  definition(t) {
    t.string('name', { description: '用户账户' })
    t.int('user_id', { description: '用户id' })
    t.string('email', { description: '邮件' })
    t.string('nickName', { description: '昵称' })
    t.string('phone')
    t.field('role', { type: UserRoleEnum, description: '角色' })
    t.string('avatar', { description: '用户头像' })
    t.string('verifyType', { description: '用户验证方式，为空表示暂未验证' })
  }
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getCurrentUser', {
      description: '获取当前登录用户的基本信息',
      type: 'UserInfo',
      async resolve(_, args, ctx) {
        const decoded = decodedToken(ctx.req)
        return await ctx.prisma.user.findUnique({
          where: {
            user_id: decoded?.userId
          }
        })
      }
    })
    t.field("listUserFuzzyByUserName", {
      description: "用户姓名的模糊查询",
      type: list('UserInfo'),
      args: {
        keywords: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        decodedToken(ctx.req)
        if (!args.keywords) {
          return []
        }
        return await ctx.prisma.user.findMany({
          where: {
            name: {
              contains: args.keywords
            }
          },
          select: {
            name: true,
            email: true,
            user_id: true
          }
        })
      }
    })
  }
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      description: '用户邮箱&密码注册',
      type: 'String',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_, args, ctx){
        const existUser = await ctx.prisma.user.findUnique({
          where: {
            email: args.email
          }
        })
        if (existUser) {
          throw new Error('邮箱不可用！')
        }
        const passwordHash = await bcrypt.hash(args.password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            email: args.email,
            password: passwordHash,
          }
        })
        const token = generateToken(user.user_id, '30m')
        // 发送邮件，不阻塞整个注册流程（后续可以再次发送验证）
        sendRestEmail(args.email, `http://localhost:3000/verify?t=${token}`)
        return token
      }
    })
    t.field('checkEmailValidation', {
      description: '检测邮箱是否可用',
      type: 'Boolean',
      args: {
        email: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: args.email
          }
        })
        return !user
      }
    })
    t.field('sendResetPasswordEmail', {
      description: '发送重设密码链接',
      type: 'Boolean',
      args: {
        email: nonNull(stringArg())
      },
      async resolve(_, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: args.email
          }
        })
        if (!user) {
          throw new Error('用户不存在')
        }
        const token = generateToken(user?.user_id, '30m')
        return await sendRestEmail(args.email, `http://localhost:3001/password_reset?t=${token}`)
      }
    })
    t.field('sendVerifyEmail', {
      description: '发送验证邮件',
      type: 'Boolean',
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req)
        const user = await ctx.prisma.user.findUnique({
          where: {
            user_id: info?.userId
          }
        })
        if (!user) {
          throw new Error('用户不存在')
        }
        const token = generateToken(user.user_id, '30m')
        await sendVerifyEmail(user.email, `http://localhost:3001/verify?t=${token}`)
        return true
      }
    })
    t.field('resetPassword', {
      type: 'Boolean',
      args: {
        password: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const decoded = decodedToken(ctx.req)
        const targetUser = await ctx.prisma.user.findUnique({
          where: {
            user_id: decoded?.userId
          }
        })
        const isEqual = await bcrypt.compare(args.password, targetUser!.password)
        if(!isEqual) {
          await ctx.prisma.user.update({
            where: {
              user_id: targetUser?.user_id
            },
            data: {
              password: bcrypt.hashSync(args.password, 10)
            }
          })
          return true
        } else {
          throw new Error('密码无改动，无需修改！')
        }
      }
    }),
    t.field('login', {
      description: '邮箱&密码登录',
      type: 'String',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const targetUser = await ctx.prisma.user.findUnique({
          where: {
            email: args.email
          }
        })
        if (!targetUser) {
          throw new Error('邮箱或密码错误')
        }
        const isEqual = await bcrypt.compare(args.password, targetUser.password)
        if (!isEqual) {
          throw new Error('邮箱或密码错误')
        }
        return generateToken(targetUser.user_id)
      }
    })
    t.field('updateUserInfo', {
      description: '编辑用户信息',
      type: 'Boolean',
      args: {
        name: stringArg(),
        phone: stringArg(),
        nickName: stringArg(),
        role: UserRoleEnum,
        avatar: stringArg()
      },
      async resolve(_, args, ctx) {
        const decoded = decodedToken(ctx.req)
        await ctx.prisma.user.update({
          where: {
            user_id: decoded?.userId
          },
          data: {
            name: args.name,
            phone: args.phone,
            nickName: args.nickName,
            role: args.role,
            avatar: args.avatar
          }
        })
        return true
      }
    })
    t.field('verifyEmail',{
      description: '邮箱验证',
      type: 'String',
      async resolve(_, args, ctx) {
        const info = decodedToken(ctx.req)
        await ctx.prisma.user.update({
          where: {
            user_id: info?.userId
          },
          data: {
            verifyType: 'email'
          }
        })
        return generateToken(info?.userId!)
      }
    })
  }
})
