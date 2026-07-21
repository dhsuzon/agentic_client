import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

export function getAuth() {
  const MONGODB_URL = process.env.MONGODB_URL!;
  const AUTH_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL || "http://localhost:3000";
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
  const client = new MongoClient(MONGODB_URL);
  return betterAuth({
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: "user",
          required: false,
          input: false,
        },
      },
    },
    database: mongodbAdapter(client.db("tutorialpoints")),
    account: {
      accountLinking: {
        requireLocalEmailVerified: false,
        trustedProviders: ["google"],
      },
    },
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      },
    },
    plugins: [jwt()],
    advanced: {
      cookiePrefix: "tutorialpoints",
      defaultCookieAttributes: {
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    },
    trustedOrigins: [AUTH_URL],
  });
}
