"use client";
import { useState } from "react";
import { LinkProps } from "@/types/LinkProps";
import NewLinkForm from "./NewLinkForm";

export default function LinksDisplay({ inputLinks }: { inputLinks: LinkProps[] }) {
  const [links, setLinks] = useState(inputLinks);
  const [temporaryLink, setTemporaryLink] = useState<LinkProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center">
      <NewLinkForm
        append={(link) => {
          setLinks((prev) => [...prev, link]);
          setTemporaryLink(link);
          setError(null);
        }}
        onError={(msg) => setError(msg)}
      />

      {error && <p className="text-white-600 mt-2 text-sm">{error}</p>}

      {temporaryLink && (
        <div className="mt-4 text-center font-bold">
          <p>Your shortened link:</p>
          <a
            className="text-white-600 underline"
            href={`/${temporaryLink.alias}`}
          >
            {`${window.location.origin}/${temporaryLink.alias}`}
          </a>
        </div>
      )}
    </div>
  );
}
