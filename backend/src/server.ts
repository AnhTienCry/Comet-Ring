import env from './config/env';
import connectToDatabase from './config/db';
import app from './app';

const bootstrap = async (): Promise<void> => {
  try {
    await connectToDatabase();
    app.listen(env.port, () => {
      console.log(`🚀 Comet Ring API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Server bootstrap failed', error);
    process.exit(1);
  }
};

void bootstrap();

