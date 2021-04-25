import * as React from "react"
import { useLoadingOverlayState } from "@codesandbox/sandpack-react"
import { useClasser } from "@cross2d/classer"

export function LoadingOverlay() {
  const c = useClasser("ch-hike")
  const loadingOverlayState = useLoadingOverlayState()
  return loadingOverlayState === "visible" ? (
    <div className={c("loading")}>
      <div className={c("loading-cubes")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null
}
