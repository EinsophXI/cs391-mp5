import LinksDisplay from "@/components/LinksDisplay";
import getAllLinks from "@/lib/getLink";

export default async function Home() {
  const links = await getAllLinks();

  return (
    <div className="flex flex-col items-center bg-[#8E3B46] p-4">
      <LinksDisplay inputLinks={links} />
    </div>
  )
}