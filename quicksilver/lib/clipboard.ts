// based on https://stackoverflow.com/a/65996386
export async function copyToClipboardGraceful(text: string): Promise<boolean> {
  // Navigator clipboard api needs a secure context (https), the types aren't trusted here
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // Use the 'out of viewport hidden text area' trick
  const textArea = document.createElement("textarea")
  textArea.value = text

  // Move textarea out of the viewport so it's not visible
  textArea.style.position = "absolute"
  textArea.style.left = "-999999px"

  document.body.prepend(textArea)
  textArea.select()

  try {
    // NOTE: deprecated how it's literally for old browsers lol, some browsers may not even support it anymore
    // eslint-disable-next-line @typescript-eslint/no-deprecated, @typescript-eslint/no-unnecessary-condition
    document?.execCommand("copy")
    return true
  } catch (error) {
    console.error(error)
    return false
  } finally {
    textArea.remove()
  }
}
