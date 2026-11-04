import { safeLink } from "@/lib/blog-links";

export default function BlogContent({ content = "" }) {
  const parts = [];
  const pattern = /\[([^\]\n]+)\]\(([^\s)]+)\)/g;
  let last = 0;
  for (const match of content.matchAll(pattern)) {
    parts.push(content.slice(last, match.index));
    const href = safeLink(match[2]);
    parts.push(href ? <a key={match.index} href={href} className="font-medium text-sky-700 underline underline-offset-2 break-words">{match[1]}</a> : match[1]);
    last = match.index + match[0].length;
  }
  parts.push(content.slice(last));
  return <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-slate-800">{parts}</div>;
}
