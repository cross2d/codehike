import React from "react"
import { Back, Forward, Open } from "./buttons"
import { FrameButtons } from "@cross2d/mini-frame"

export { TitleBar }

function TitleBar({
  url,
  linkUrl,
}: {
  url: string
  linkUrl: string
}) {
  return (
    <>
      <FrameButtons />
      <Back />
      <Forward />
      {/* <Refresh /> */}
      <input value={url || ""} readOnly />
      <Open href={linkUrl} />
    </>
  )
}
