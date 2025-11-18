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

function aliasValid(alias: string): boolean {
  const validChars = /^[a-zA-Z0-9-_]+$/;
  return validChars.test(alias);
}

export async function handleServerError(error: any) {
  try {
    console.error("Server error:", error);

    if (error instanceof Error) {
      return { message: error.message };
    }

    return {
      message: "Unknown server error",
      statusCode: 500
    };
  } catch (catchErr: any) {
    return {
      message: catchErr.message
    };
  }
}

export default async function createNewURL(
  url: string,
  alias: string,
): Promise<LinkProps | { errMsg: string; }> {
  console.log("creating new link")

  if (!urlValid(url)) {
    return { errMsg: "Invalid URL" };
  }

  if (!aliasValid(alias)) {
    return { errMsg: "Alias contains invalid characters" };
  }

  const l = {
    url: url,
    alias: alias,
  };

  const linkCollection = await getCollection(LINK_COLLECTION)
  const existing = await linkCollection.findOne({ alias });
  if (existing) {
    return { errMsg: "Alias already exists" };
  }
  const res = await linkCollection.insertOne({ ...l });

  if (!res.acknowledged) {
    return { errMsg: "DB insert failed" };
  }

  return { ...l, id: res.insertedId.toHexString() }
}