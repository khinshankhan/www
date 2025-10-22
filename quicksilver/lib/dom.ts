export const interactiveTags = ["a", "button", "input", "textarea", "select"]

export const interactiveRoles = ["button", "link", "textbox", "listbox", "switch"]

export function isInteractiveElement(element: HTMLElement) {
  return (
    interactiveTags.includes(element.tagName.toLowerCase()) ||
    interactiveRoles.includes(element.getAttribute("role") ?? "")
  )
}
