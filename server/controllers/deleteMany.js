import prisma from '../prismaClient.js';

async function deleteMany(p) {
    try {
        const deleteuser = await prisma.user.deleteMany({
            where:{
                age:{lt:18}
            }
        })
        console.log(deleteuser)
    } catch (error) {
        console.log(error)
    }
}
deleteMany()