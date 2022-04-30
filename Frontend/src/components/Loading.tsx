import { Spin } from 'antd'
import { memo } from 'react'
import styled from 'styled-components'


/**
 * Style
 */
const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    background: rgba(255, 255, 255, .5);
`


/**
 * Component
 */
const Loading = (): JSX.Element => (
  <LoadingContainer>
    <Spin size="large" tip="Loading..." />
  </LoadingContainer>
)

export default memo(Loading)
