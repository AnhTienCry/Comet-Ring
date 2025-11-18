import mongoose from 'mongoose';

describe('Database Connection', () => {
  afterAll(async () => {
    // Đóng connection sau khi test xong
    await mongoose.connection.close();
  });

  test('Should connect to MongoDB successfully', async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comet-ring-test';
    
    await mongoose.connect(MONGODB_URI);
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  }, 10000);

  test('Should handle invalid MongoDB URI', async () => {
    const INVALID_URI = 'mongodb://invalid-host:99999/test';
    
    await expect(
      mongoose.connect(INVALID_URI, { 
        serverSelectionTimeoutMS: 2000 
      })
    ).rejects.toThrow();
  });
});