import prisma from '../prismaClient.js';

async function updateOne() {
    try {
        const updatedUser = await prisma.user.update({
            where: { email: "alice@example.com" }, // Find by email
            data: { password: "NewAlice@123" } // Update password
        });

        console.log("Updated user:", updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
    }
}

updateOne();
