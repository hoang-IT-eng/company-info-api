export function successResponse<T>(data: T, total?: number) {
  if (typeof total === 'number') {
    return { success: true, data, total }
  }
  return { success: true, data }
}

export function extractDataAndTotal(payload: any): { data: any; total?: number } {
  if (payload && typeof payload === 'object') {
    const total = (payload as { total?: unknown }).total
    const data = (payload as { data?: unknown }).data
    if (typeof total === 'number' && data !== undefined) {
      return { data, total }
    }
  }
  return { data: payload }
}
