if (process.env.TRELLO_API_KEY == null) {
  throw new Error("TRELLO_API_KEY environment variable is not set!");
}

if (process.env.TRELLO_API_TOKEN == null) {
  throw new Error("TRELLO_API_TOKEN environment variable is not set!");
}

export const TRELLO_API_KEY = process.env.TRELLO_API_KEY;
export const TRELLO_API_TOKEN = process.env.TRELLO_API_TOKEN;
