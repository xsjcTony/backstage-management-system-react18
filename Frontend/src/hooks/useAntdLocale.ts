import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { LocaleType } from '@ant-design/pro-layout/es/locales'


const useAntdLocale = (): LocaleType => {
  let locale = useSelector((state: RootState) => state.layout.locale)

  if (!['zh-CN', 'zh-TW', 'en-US', 'it-IT', 'ko-KR'].includes(locale)) {
    locale = 'en-US'
  }

  return locale as LocaleType
}

export default useAntdLocale
