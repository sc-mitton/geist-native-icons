export const toHumpName = (name: string): string => {
  return name.replace(/-(.)/g, g => g[1].toUpperCase())
}

export const replaceAll = (target: string, find: string, replace: string): string => {
  return target.split(find).join(replace)
}
