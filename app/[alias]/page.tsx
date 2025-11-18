import getCollection, { LINK_COLLECTION } from "@/db";
import { redirect } from "next/navigation";

export default async function RedirectPage(props: any) {
  const { alias } = await props.params;
  const collection = await getCollection(LINK_COLLECTION);
  const doc = await collection.findOne({ alias });
  if (!doc) {
    return <h1>Alias not found</h1>;
  }
  redirect(doc.url);
}