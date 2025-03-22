import prisma from '../prismaClient.js';

async function insertMany() {
    try {
        const users = await prisma.user.createMany({
            data: [
                {
                    name: "Alice",
                    email: "alice@example.com",
                    password: "Alice@123" 
                },
                {
                    name: "Bob",
                    email: "bob@example.com",
                    password: "Bob@123" 
                }
            ]
        });

        console.log("Inserted users:", users);
    } catch (error) {
        console.error("Error inserting users:", error);
    }
}

insertMany();
