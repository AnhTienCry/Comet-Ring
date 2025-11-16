import path from 'path';

// Use process.cwd() so the uploads folder lives next to the backend working directory
// This makes the runtime location predictable whether running TS or compiled JS.
export const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

export default UPLOADS_DIR;
