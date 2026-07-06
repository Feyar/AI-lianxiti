/** 把题干里的 `code` 渲染成 <code class="qi-code">，并先转义防注入 */
export function renderInline(s: string): string {
  if (!s) return ''
  const esc = s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return esc.replace(/`([^`]+)`/g, '<code class="qi-code">$1</code>')
}
