"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFormProps {
  onSubmit?: (name: string) => void;
  isPending?: boolean;
}

export default function CategoryForm({
  onSubmit,
  isPending = false,
}: CategoryFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const categoryName = name.trim();

    if (!categoryName) return;

    onSubmit?.(categoryName);

    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category-name" className="text-white">
          Category Name
        </Label>

        <Input
          id="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Web Development"
          disabled={isPending}
          className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30"
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || !name.trim()}
        className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Create Category
          </>
        )}
      </Button>
    </form>
  );
}