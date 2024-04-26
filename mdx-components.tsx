import type { MDXComponents } from "mdx/types"
import { Code } from "./app/components/code"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
  }
}
