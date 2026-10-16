// Distance on screen between press and release beyond which a click is the end of a drag
const DRAG_DISTANCE = 4

// OverlayPlugin drags unlocked overlays by moving their window under the cursor, without sending any mouse move:
// the page then gets a click on the very spot it was pressed. Only the position on screen, which follows the
// window, tells a drag from a click
export function isDragRelease(press, release) {
	return press != null
		&& Math.hypot(release.screenX - press.screenX, release.screenY - press.screenY) > DRAG_DISTANCE
}
