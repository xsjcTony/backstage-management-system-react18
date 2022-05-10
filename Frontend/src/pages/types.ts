interface PromptInfo {
  type: string
  promptInfo: {
    type: 'error' | 'info' | 'success' | 'warn'
    intlId: string
    duration: number
    path: string
    noPrivilege: boolean
  }
}

export const isPromptInfo = (state: unknown): state is PromptInfo => {
  if (!state) return false
  return (state as PromptInfo).type === 'prompt'
}
