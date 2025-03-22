# Prisma with MySQL Setup in WSL

This guide explains how to install, set up, and connect **Prisma** with **MySQL** in a Node.js project inside **WSL (Windows Subsystem for Linux)**.

---

## **1. Install Prisma and MySQL Driver**
Run the following commands inside your Node.js project folder:

```sh
npm init -y  # Initialize package.json (if not already done)
npm install prisma --save-dev  # Install Prisma
npm install @prisma/client  # Install Prisma client
npm install mysql2  # Install MySQL driver
```

---

## **2. Initialize Prisma**
Run:

```sh
npx prisma init
```

This creates:
- **`prisma/schema.prisma`** (Prisma schema file)
- **`.env`** (Environment variables file)

---

## **3. Create and Start MySQL Database**
### **Step 1: Start MySQL Service**
If MySQL is installed inside WSL, start the service:
```sh
sudo service mysql start
```
If MySQL is installed on Windows, start it using:
```sh
net start MySQL80
```

### **Step 2: Login to MySQL**
```sh
mysql -u root -p
```
Enter your MySQL root password when prompted.

### **Step 3: Create a New Database**
Once inside the MySQL shell, run:
```sql
CREATE DATABASE yourdatabase;
```
Replace `yourdatabase` with your preferred database name.

### **Step 4: Verify Database Creation**
```sql
SHOW DATABASES;
```
This will list all available databases, including the one you just created.

---

## **4. Get MySQL Connection URL in WSL**
### **Step 1: Check MySQL Host**
#### **If MySQL is installed inside WSL**
Use **127.0.0.1** as the host:
```sh
echo "127.0.0.1"
```

#### **If MySQL is installed on Windows**
Find the Windows IP inside WSL:
```sh
grep nameserver /etc/resolv.conf | awk '{print $2}'
```
Example output: `192.168.1.100` (use this as `HOST`).

### **Step 2: Find MySQL Port**
```sh
sudo netstat -tlnp | grep mysql
```
Default port: `3306`

### **Step 3: Set DATABASE_URL in `.env`**
```env
DATABASE_URL="mysql://root:yourpassword@127.0.0.1:3306/yourdatabase"
```

If MySQL runs **on Windows**, replace `127.0.0.1` with your **Windows IP**.

---

## **5. Define Prisma Schema**
Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  password  String
  createdAt DateTime @default(now())
}
```

---

## **6. Apply Migrations and Generate Prisma Client**
Run:

```sh
npx prisma migrate dev --name init
npx prisma generate
```

---

## **7. Connect Prisma to MySQL**
Create `prismaClient.js`:

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

Example usage in `index.js`:

```js
import prisma from './prismaClient.js';

const createUser = async () => {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword123',
      },
    });
    console.log('User Created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

createUser();
```

---

## **8. Test Prisma Connection**
Run:

```sh
npx prisma db push
```

To check MySQL status:

```sh
sudo service mysql status  # If running inside WSL
net start MySQL80  # If running on Windows
```

---

## **9. Run Prisma Studio (GUI for DB Management)**
```sh
npx prisma studio
```

This opens a **GUI in your browser** to manage the database.

---

## **10. Notes**
- Use **`npx prisma migrate dev`** for development migrations.
- Use **`npx prisma migrate deploy`** in production.
- Use **`npx prisma db push`** for schema changes without migration history.

---

## **Done! 🎉**
Now, Prisma is successfully connected to MySQL in your **WSL environment**.
