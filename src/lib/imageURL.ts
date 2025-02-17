import { client } from "@/sanity/lib/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import  imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder (client);

export function imageURL(source: SanityImageSource) {
    return builder.image(source)
}