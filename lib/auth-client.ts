"use client";

import { createAuthClient } from "better-auth/react";
import { jwtClient, inferAdditionalFields } from "better-auth/client/plugins";
import { setApiToken } from "./api";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL || "http://localhost:3000",
  plugins: [
    jwtClient(),
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

export async function fetchAndSetToken() {
  const { data, error } = await authClient.token();
  if (data?.token) {
    setApiToken(data.token);
    return data.token;
  }
  if (error) console.error("Failed to get JWT", error);
  return null;
}
