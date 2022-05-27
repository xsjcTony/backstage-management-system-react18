import { PlusOutlined } from '@ant-design/icons'
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form'
import { Button } from 'antd'
import { useIntl } from 'react-intl'


/**
 * Types
 */
interface AddUserData {
  username?: string
  email: string
  password: string
}

const AddUserForm = (): JSX.Element => {
  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Component
   */
  return (
    <ModalForm<AddUserData>
      autoFocusFirstInput
      title={intl.formatMessage({ id: 'pages.admin.user-list.users.add.title' })}
      trigger={(
        <Button icon={<PlusOutlined />} type="primary">
          {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.add-users' })}
        </Button>
      )}
    >
      <ProForm>
        <ProFormText label="123" />
      </ProForm>
    </ModalForm>
  )
}

export default AddUserForm
