import React from "react"
import {
  CodeFiles,
  CodeProps,
  PreviewProps,
} from "./hike-context"

export { useMdxSteps, StepHead }

export interface StepHeadProps {
  children: any
  focus?: string
  activeFile?: string
  codeProps?: Partial<CodeProps>
  previewProps?: Partial<PreviewProps>
}

function StepHead(props: StepHeadProps): JSX.Element {
  return (null as any) as JSX.Element
}

interface Step {
  content: React.ReactNode[]
  previewProps: PreviewProps
  codeProps: CodeProps
}

interface Options {
  defaultFileName?: string
}

function useMdxSteps(
  mdx: React.ReactNode,
  previewProps: PreviewProps,
  codeProps: CodeProps,
  options: Options = {}
) {
  const steps: Step[] = []
  let prevFiles: CodeFiles = {}
  let prevActiveFile = ""
  React.Children.forEach(mdx, (child: any) => {
    if (child?.props?.mdxType === "StepHead") {
      const stepHeadProps = child?.props || {}
      const { files, activeFile } = getFiles(
        stepHeadProps,
        prevFiles,
        prevActiveFile,
        options.defaultFileName
      )
      const step = {
        content: [],
        previewProps: getPreviewProps(
          stepHeadProps,
          previewProps
        ),
        codeProps: getCodeProps(
          stepHeadProps,
          codeProps,
          files,
          activeFile
        ),
      }
      steps.push(step)
      prevFiles = files
      prevActiveFile = activeFile
    } else {
      steps[steps.length - 1].content.push(child)
    }
  })
  return steps
}

function getFiles(
  stepHeadProps: StepHeadProps,
  prevFiles: CodeFiles = {},
  prevActiveFile: string = "",
  defaultFileName: string = "App.js"
) {
  let activeFile = stepHeadProps.activeFile || ""
  const files = { ...prevFiles }
  React.Children.forEach(
    stepHeadProps.children,
    preElement => {
      const codeElementProps =
        preElement?.props?.children?.props || {}
      const lang = codeElementProps.className?.slice(9)
      const { filename, hideTab } = parseMetastring(
        codeElementProps.metastring || defaultFileName
      )
      const code = codeElementProps.children
      files[filename] = { code, lang, hideTab }
      if (activeFile === "") {
        activeFile = filename
      }
    }
  )
  if (activeFile === "") {
    activeFile = prevActiveFile
  }
  return { files, activeFile }
}

function parseMetastring(metastring: string) {
  const [filename, ...params] = metastring.split(" ")
  return { filename, hideTab: params.includes("hidden") }
}

function getPreviewProps(
  stepHeadProps: StepHeadProps,
  hikePreviewProps: PreviewProps
): PreviewProps {
  return {
    ...hikePreviewProps,
    ...stepHeadProps.previewProps,
  }
}

function getCodeProps(
  stepHeadProps: StepHeadProps,
  hikeCodeProps: CodeProps,
  files: CodeFiles,
  activeFile: string
): CodeProps {
  return {
    ...hikeCodeProps,
    ...stepHeadProps.codeProps,
    focus: stepHeadProps.focus || "",
    activeFile,
    files,
  }
}
