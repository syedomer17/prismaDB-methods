import prisma from "../prismaClient.js";

async function findOne() {
    try {
        let find = await prisma.user.findUnique({where:{email:"test@gmail.com"}});
        console.log(find)
    } catch (error) {
        console.log(error)
    }
}
findOne()