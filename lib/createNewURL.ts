"use server";

import getCollection, { LINK_COLLECTION } from "@/db";
import { LinkProps } from "@/types/LinkProps";


function urlValid(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function createNewURL(
  url: string,
  alias: string,
): Promise<LinkProps> {
  console.log("creating new link")

  if (!urlValid(url)) {
    throw new Error("Invalid URL");
  }

  const l = {
    url: url,
    alias: alias,
  };

  const linkCollection = await getCollection(LINK_COLLECTION)
  const existing = await linkCollection.findOne({ alias });
  if (existing) {
    throw new Error("Alias already exists");
  }
  const res = await linkCollection.insertOne({ ...l });

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return { ...l, id: res.insertedId.toHexString() }
}