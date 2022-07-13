import { booleanArg, extendType, intArg, list, nonNull, objectType, stringArg } from "nexus";

export const FeedbackItem = objectType({
  name: 'FeedbackItem',
  description: '系统使用反馈项',
  definition(t) {
    t.nonNull.int('feedback_id'),
    t.string('message')
    t.nonNull.boolean('result')
    t.field("user", {
      type: 'UserInfo',
    })
  }
})

export const FeedbackPaging = objectType({
  name: 'FeedbackPaging',
  description: '用户反馈的分页对象',
  definition(t) {
    t.nonNull.int("total");
    t.nonNull.int("pageSize");
    t.nonNull.int("current");
    t.field("records", {
      type: list(FeedbackItem),
    });
  }
})

export const FeedbackQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('countPositive', {
      description: '点赞次数统计',
      type: 'Int',
      async resolve(_, args, ctx) {
        return await ctx.prisma.feedback.count({
          where: {
            result: true
          }
        })
      }
    })
    t.field('pageFeedbackNegative', {
      description: '反馈问题内容分页',
      type: FeedbackPaging,
      args: {
        pageSize: nonNull(intArg()),
        pageNo: nonNull(intArg()),
      },
      async resolve(_, args, ctx) {
        const records = await ctx.prisma.feedback.findMany({
          where: {
            result: false
          },
          skip: (args.pageNo - 1) * args.pageSize,
          take: args.pageSize,
        })
        const total = await ctx.prisma.feedback.count({
          where: {
            result: false
          }
        })
        return {
          current: args.pageNo,
          pageSize: args.pageSize,
          records: records,
          total,
        }
      }
    })
  }
})

export const FeedbackMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('feedback', {
      type: 'Int',
      description: '反馈(新增/修改描述)',
      args: {
        result: nonNull(booleanArg()),
        userId: intArg(),
        message: stringArg(),
        feedbackId: intArg()
      },
      async resolve(_, args, ctx) {
        // 编辑流程
        if (args.feedbackId) {
          if (args.message) {
            ctx.prisma.feedback.update({
              where: {
                feedback_id: args.feedbackId,
              },
              data: {
                message: args.message
              }
            })
          }
          return args.feedbackId
        }
        // 新增流程
        const feedback = await ctx.prisma.feedback.create({
          data: {
            result: args.result,
            message: args.message
          }
        })
        if (args.userId) {
          await ctx.prisma.user.update({
            where: {
              user_id: args.userId
            },
            data: {
              Feedback: {
                connect: [{ feedback_id: feedback.feedback_id }]
              }
            }
          })
        }
        return feedback.feedback_id
      }
    })
  }
})
