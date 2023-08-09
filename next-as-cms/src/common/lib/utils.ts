export function maskMobile(v: string) {
  return v?.replace(/(.{3})(.{4})(.*)/, "$1****$3")
}
