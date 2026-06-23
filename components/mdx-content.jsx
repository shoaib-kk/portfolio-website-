import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/code-block";
import {
  ArchitectureDiagram,
  Callout,
  Comparison,
  ImageGallery,
  ProjectImage,
  Video,
} from "@/components/mdx-media";

const components = {
  a: ({ href = "", children, ...props }) => {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return <Link href={href} {...props}>{children}</Link>;
  },
  img: ({ src, alt = "" }) => <ProjectImage src={src} alt={alt} />,
  pre: CodeBlock,
  ProjectImage,
  ImageGallery,
  Comparison,
  Video,
  ArchitectureDiagram,
  Callout,
};

const prettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
};

export function MdxContent({ source }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
