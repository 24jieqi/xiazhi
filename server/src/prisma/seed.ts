import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.langs.createMany({
    data: [
      {
        label: '中文',
        value: 'CHINESE'
      },
      {
        label: '英语',
        value: 'ENGLISH'
      },
      {
        label: '泰语',
        value: 'THAI'
      },
      {
        label: '越南语',
        value: 'VIETNAMESE'
      }
    ]
  })
  console.log('initialization successful!')
}

main().then( async() => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
