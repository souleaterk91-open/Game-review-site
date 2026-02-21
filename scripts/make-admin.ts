import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.update({
        where: { email: 'souleaterk91@gmail.com' },
        data: { role: 'ADMIN' },
    })
    console.log(`Successfully updated ${user.email} to ADMIN role!`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
