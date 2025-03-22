import prisma from '../prismaClient.js';

async function updateMany() {
    try {
        const updatedUsers = await prisma.user.updateMany({
            where: { name: "Bob" }, // Find all users named Bob
            data: { password: "NewPassword@123" } // Update password for all
        });

        console.log(`Updated ${updatedUsers.count} users.`);
    } catch (error) {
        console.error("Error updating users:", error);
    }
}

updateMany();
