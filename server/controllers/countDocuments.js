import prisma from '../prismaClient.js';

async function countDocument() {
    try {
        const count = await prisma.user.count();
        console.log(`Total users ${count}`)
    } catch (error) {
        console.log(error)
    }
}
countDocument()