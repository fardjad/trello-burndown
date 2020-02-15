if (process.env.DB_FILE == null) {
  throw new Error("DB_FILE environment variable is not set!");
}

export const DB_FILE = process.env.DB_FILE;
