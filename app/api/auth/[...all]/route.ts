import { toNextJsHandler } from "better-auth/next-js";

let handler: ReturnType<typeof toNextJsHandler> | undefined;

async function getHandler() {
  if (!handler) {
    const { getAuth } = await import("@/lib/auth");
    handler = toNextJsHandler(getAuth());
  }
  return handler;
}

export async function GET(request: Request) {
  const h = await getHandler();
  return h.GET(request);
}

export async function POST(request: Request) {
  const h = await getHandler();
  return h.POST(request);
}

export async function PATCH(request: Request) {
  const h = await getHandler();
  return h.PATCH(request);
}

export async function PUT(request: Request) {
  const h = await getHandler();
  return h.PUT(request);
}

export async function DELETE(request: Request) {
  const h = await getHandler();
  return h.DELETE(request);
}
