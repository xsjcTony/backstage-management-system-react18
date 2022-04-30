import { PropsWithChildren, useEffect, useState } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useSelector } from 'react-redux'
import enUS from './en-US'
import type { RootState } from '../store'


/**
 * Component
 */
const IntlProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  const [message, setMessage] = useState(enUS)
  const locale = useSelector((state: RootState) => state.layout.locale)

  useEffect(() => {
    import(`../locales/${locale}.ts`)
      .then(module => void setMessage(module.default))
      .catch(err => void console.error(err))
  }, [locale])

  return (
    <ReactIntlProvider locale={locale} defaultLocale="en-US" messages={message}>
      {children}
    </ReactIntlProvider>
  )
}

export default IntlProvider
