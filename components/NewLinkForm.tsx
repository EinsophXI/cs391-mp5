"use client";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import createNewURL from "@/lib/createNewURL";
import { LinkProps } from "@/types/LinkProps";

export default function NewLinkForm({
  append,
  onError,
}: {
  append: (link: LinkProps) => void;
  onError: (msg: string) => void;
}) {
  const [url, setURL] = useState("");
  const [alias, setAlias] = useState("");

  return (
    <form
      className="w-96 rounded-xl p-4 bg-[#B4B8C5]"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!url || !alias) {
          onError("Please enter a URL and an alias");
          return;
        }

        try {
          const newLink = await createNewURL(url, alias);
          append(newLink);
          setURL("");
          setAlias("");
        } catch (err: any) {
          onError(err.message || "Error creating link");
        }
      }}
    >
      <div className="font-bold text-black text-center p-2"> Shorten a URL </div>
      <TextField
        label="URL"
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        value={url}
        onChange={(e) => setURL(e.target.value)}
      />
      <TextField
        label="Alias"
        variant="filled"
        sx={{ backgroundColor: "white", width: "100%" }}
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <div className="w-full flex justify-center p-4">
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "80px",
            bgcolor: "#D8DDDE",
            color: "black",
            "&:hover": { bgcolor: "white", color: "black" },
          }}
        >
          Create
        </Button>
      </div>
    </form>
  );
}