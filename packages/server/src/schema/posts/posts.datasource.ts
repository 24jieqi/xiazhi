import prisma from 'prisma/prisma'

export class PostsDataSource {
  public static async createPost(
    title: string,
    authorId: number,
    content?: string | null,
  ) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    })
    return post.id
  }
  public static async getAllPosts() {
    return prisma.post.findMany({})
  }
  public static async getUserCreatedPosts(authorId: number) {
    return prisma.post.findMany({
      where: {
        authorId,
      },
    })
  }
}
