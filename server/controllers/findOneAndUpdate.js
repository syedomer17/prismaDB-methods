import prisma from '../prismaClient.js';

async function findOneAndUpdate() {
    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email: "test@gmail.com" },
        });

        if (!user) {
            console.log("User not found. No update performed.");
            return;
        }

        // If found, update the user
        const updatedUser = await prisma.user.update({
            where: { email: "test@gmail.com" },
            data: { name: "Updated Name" },
        });

        console.log("Updated user:", updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

findOneAndUpdate();
