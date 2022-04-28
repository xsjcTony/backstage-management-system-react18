import { DownloadOutlined } from '@ant-design/icons'
import { Button, Switch } from 'antd'
import { useState } from 'react'
import type { SizeType } from 'antd/es/config-provider/SizeContext'


const App = (): JSX.Element => {
  const [size, setSize] = useState<SizeType>('large')

  return (
    <>
      <Button type="primary" icon={<DownloadOutlined />} size={size} />
      <Button
        type="primary"
        shape="circle"
        icon={<DownloadOutlined />}
        size={size}
      />
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size={size}
      />
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size={size}
      >
        Download
      </Button>
      <Button type="primary" icon={<DownloadOutlined />} size={size}>
        Download
      </Button>
      <Switch defaultChecked />
    </>
  )
}

export default App
