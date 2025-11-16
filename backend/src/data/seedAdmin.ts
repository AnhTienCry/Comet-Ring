import connectToDatabase from '../config/db';
import User from '../models/User';

const seedAdmin = async (): Promise<void> => {
  try {
    await connectToDatabase();

    const adminEmail = 'admin@cometring.com';
    const adminPassword = 'admin123';
    const adminName = 'Admin';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      process.exit(0);
      return;
    }

    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      name: adminName,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

void seedAdmin();

