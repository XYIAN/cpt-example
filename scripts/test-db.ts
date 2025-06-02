import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('Testing database connection...');
    
    // Try to count all members
    const count = await prisma.member.count();
    console.log('Total members in database:', count);
    
    if (count === 0) {
      // Try to create a test member
      const testMember = await prisma.member.create({
        data: {
          firstName: 'Test',
          lastName: 'User',
          version: 1,
          isLocked: false
        }
      });
      console.log('Created test member:', testMember);
    }
    
    // Fetch a few members to verify data
    const members = await prisma.member.findMany({
      take: 5,
      orderBy: { lastName: 'asc' }
    });
    console.log('Sample members:', members);
    
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase(); 