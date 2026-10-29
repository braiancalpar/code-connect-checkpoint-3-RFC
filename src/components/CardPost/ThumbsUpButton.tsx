import type { ButtonHTMLAttributes } from "react";
import { IconButton } from "@/components/IconButton";
import { Spinner } from "@/components/Spinner";
import { IconThumbsUp } from "@/components/icons/IconThumbsUp";
export function ThumbsUpButton({
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading: boolean }) {
  return (
    <IconButton disabled={loading || props.disabled} {...props}>
      {loading ? <Spinner /> : <IconThumbsUp />}
    </IconButton>
  );
}
