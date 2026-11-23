export function hasSamples(count: number): boolean {
  return count > 0 ? true : false
}

export function isSelected(id: string, selectedId: string): boolean {
  return id == selectedId
}
