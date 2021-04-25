import * as React from "react"
import { ClasserProvider } from "@cross2d/classer"
import "./index.scss"
import { Swap } from "server-side-media-queries-for-react"
import { HikeProps } from "./hike-context"
import { FluidLayout } from "./fluid-layout"
import { FixedLayout } from "./fixed-layout"

export { Hike }

function Hike({ classes, ...props }: HikeProps) {
  console.log("Hike----->props",props)
  return (
    <ClasserProvider classes={classes}>
      <Swap
        match={[
          [
            "(min-width: 920px)",
            <FluidLayout {...props} />,
          ],
          ["default", <FixedLayout {...props} />],
        ]}
      />
    </ClasserProvider>
  )
}
