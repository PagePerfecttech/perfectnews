import { prisma } from "@/lib/db";
import { seedUsers } from "@/lib/user-actions";
import { UserClient } from "./user-client";

export default async function UserManagementPage() {
  // Demo auto-seed
  const count = await prisma.user.count();
  if (count === 0) {
    await seedUsers();
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <UserClient users={users} />;
}
