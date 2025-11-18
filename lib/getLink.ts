import getCollection, { LINK_COLLECTION } from "@/db";
import { LinkProps } from "@/types/LinkProps";

export default async function getAllLinks(): Promise<LinkProps[]> {
  const linksCollection = await getCollection(LINK_COLLECTION);
  const data = await linksCollection.find().toArray();

  const links: LinkProps[] = data.map((p) => ({
    id: p._id.toHexString(),
    url: p.url,
    alias: p.alias,
  }));
  return links.reverse();
}