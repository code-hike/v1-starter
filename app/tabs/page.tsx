// @ts-ignore
import { getBlocks } from "./content.md"
import { CodeContent, CodeBlock } from "codehike"
import { Slides, Tabs } from "./slides"

type Blocks = {
  steps: StepBlock[]
}

type StepBlock = {
  query: string
  code: CodeBlock
  children: React.ReactNode[]
}

export default function Page() {
  const { steps } = getBlocks() as Blocks
  const fileNames = steps.map((step: any) => (
    step.code.meta
  ))
  const slides = steps.map((step: any) => (
    <div>
      <div className="h-44 px-6">{step.children}</div>
      <Tabs tabNames={fileNames} />
      <Code codeblock={step.code} />
    </div>
  ))
  return <Slides slides={slides} />
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[44rem] !bg-zinc-900 m-0 rounded-none"
    />
  )
}
