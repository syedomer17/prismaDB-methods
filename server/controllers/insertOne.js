import prisma from '../prismaClient.js';

async function insertMany() {
    try {
        const users = await prisma.user.create({
            data: { name: "John", email: "john@example.com",password:"12345" }
          });

        console.log("Inserted users:", users);
    } catch (error) {
        console.error("Error inserting users:", error);
    }
}

insertMany();
