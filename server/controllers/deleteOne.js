import prisma from '../prismaClient.js';

async function deleteOne() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: "test@gmail.com" },
        });

        if (!user) {
            console.log("User not found. No deletion performed.");
            return;
        }

        const deletedUser = await prisma.user.delete({
            where: { email: "test@gmail.com" },
        });

        console.log("Deleted user:", deletedUser);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

deleteOne();
