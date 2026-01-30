// components/MDXComponents.tsx
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const url = href ?? "";
    const isInternal = url.startsWith("/");
    if (isInternal) {
      return (
        <Link href={url} {...(props as any)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={url} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  pre: ({ children }) => <pre className="codeBlock">{children}</pre>,
  code: ({ children }) => <code className="inlineCode">{children}</code>,
};

export default components;
