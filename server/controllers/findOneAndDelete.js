import prisma from '../prismaClient.js';

async function findOneAndDelete() {
    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email: "test@gmail.com" },
        });

        if (!user) {
            console.log("User not found. No deletion performed.");
            return;
        }

        // If found, delete the user
        const deletedUser = await prisma.user.delete({
            where: { email: "test@gmail.com" },
        });

        console.log("Deleted user:", deletedUser);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

findOneAndDelete();
