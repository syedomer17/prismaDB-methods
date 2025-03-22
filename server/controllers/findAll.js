import prisma from "../prismaClient.js";

async function findAll() {
    try {
        let find = await prisma.user.findMany();
        console.log(find)
    } catch (error) {
        console.log(error)
    }
}
findAll()