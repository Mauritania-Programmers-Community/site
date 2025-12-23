/**
 * MDX Content Renderer for Velite-generated content
 *
 * This component renders MDX content that was compiled by Velite.
 * Velite compiles MDX to a function body string that needs to be
 * evaluated at runtime.
 */

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom MDX components
const mdxComponents = {
  // Enhanced image component with Next.js Image
  img: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;

    // For external images or images without dimensions
    if (src.startsWith("http") || src.startsWith("//")) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt || ""}
          className="rounded-lg my-6"
          loading="lazy"
          {...props}
        />
      );
    }

    // For local images, use Next.js Image
    // Exclude width/height from props to avoid type conflicts
    const { width: _w, height: _h, ...restProps } = props;
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-6"
        {...restProps}
      />
    );
  },

  // Enhanced link component
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http") || href?.startsWith("//");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mpc-green hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href || "#"} className="text-mpc-green hover:underline" {...props}>
        {children}
      </Link>
    );
  },

  // Headings with anchor links (already processed by rehype-autolink-headings)
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold mt-8 mb-4 text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold mt-8 mb-3 text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold mt-6 mb-2 text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg font-semibold mt-4 mb-2 text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ms-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ms-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-s-4 border-mpc-green ps-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code blocks (already styled by rehype-pretty-code)
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Inline code
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Check if this is inside a pre tag (block code)
    // If className exists, it's likely a code block processed by rehype-pretty-code
    if (props.className) {
      return <code {...props}>{children}</code>;
    }

    // Inline code
    return (
      <code
        className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm font-mono text-mpc-green"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Horizontal rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),

  // Table components
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-start font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),

  // Strong and emphasis
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
};

/**
 * Hook to create MDX component from Velite-compiled code
 */
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  /** The compiled MDX code from Velite */
  code: string;
  /** Additional components to merge with defaults */
  components?: Record<string, React.ComponentType<unknown>>;
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * Renders Velite-compiled MDX content
 *
 * @example
 * ```tsx
 * import { getPost } from "@/lib/content";
 * import { MDXContent } from "@/components/mdx/mdx-content";
 *
 * export default async function BlogPost({ params }) {
 *   const { slug } = await params;
 *   const post = getPost(slug, "en");
 *
 *   return (
 *     <article>
 *       <h1>{post.title}</h1>
 *       <MDXContent code={post.body} />
 *     </article>
 *   );
 * }
 * ```
 */
export function MDXContent({
  code,
  components,
  className,
}: MDXContentProps) {
  // eslint-disable-next-line react-hooks/static-components
  const Component = useMDXComponent(code);

  return (
    <div className={className}>
      <Component components={{ ...mdxComponents, ...components }} />
    </div>
  );
}

export { mdxComponents };
