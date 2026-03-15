import { auth } from "@/lib/auth/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

// This will create API route handlers for both POST and GET requests to /api/auth/[...all] automatically
export const { POST, GET } = toNextJsHandler(auth);
