import { Button, Result } from 'antd'
import { memo, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SelectLanguage from '../locales/components/SelectLanguage'


/**
 * Types
 */
interface Page404Props {
  lang?: boolean
}


/**
 * Style
 */
const CenteredContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const FixedSelectLanguage = styled(SelectLanguage)`
    position: fixed;
    top: 5px;
    right: 25px;
`

/**
 * Component
 */
const Page404 = ({ lang = false }: Page404Props): JSX.Element => {
  const intl = useIntl()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `404 - ${intl.formatMessage({
      id: 'title',
      defaultMessage: `Aelita's BMS`
    })}`
  })

  return (
    <CenteredContainer>
      <Result
        extra={(
          <Button
            type="primary"
            onClick={() => void navigate('/admin', { replace: true })}
          >
            {intl.formatMessage({
              id: 'pages.404.back',
              defaultMessage: 'Back to Home',
              description: 'Text of "back" button in 404 error page'
            })}
          </Button>
        )}
        status="404"
        subTitle={intl.formatMessage({
          id: 'pages.404.description',
          defaultMessage: 'Sorry, the page you visited does not exist',
          description: 'Description of 404 error page'
        })}
        title="404"
      />
      {lang && <FixedSelectLanguage size="24" />}
    </CenteredContainer>
  )
}

export default memo(Page404)