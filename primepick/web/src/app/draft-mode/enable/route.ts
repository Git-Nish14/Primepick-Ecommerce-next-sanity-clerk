import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { sanityClient } from "../../../../lib/client";

const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    sanityClient.withConfig({ token }),
    request.url
  );
  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  redirect(redirectTo);
}
