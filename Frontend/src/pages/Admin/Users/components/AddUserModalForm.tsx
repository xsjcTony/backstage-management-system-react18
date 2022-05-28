import { PlusOutlined } from '@ant-design/icons'
import ProForm, { ModalForm } from '@ant-design/pro-form'
import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { addUser as addUserAPI } from '../../../../services/users'
import EmailInput from '../../../components/EmailInput'
import PasswordInput from '../../../components/PasswordInput'
import UsernameInput from '../../../components/UsernameInput'
import type { ResponseData } from '../../../../services/types'
import type { ModalFormProps } from '@ant-design/pro-form'
import type { ValidateErrorEntity } from 'rc-field-form/es/interface'


/**
 * Types
 */
export interface AddUserData {
  username?: string
  email: string
  password: string
  'password-check': string
}

interface AddUserFormProps {
  reloadTable: ((resetPageIndex?: boolean) => Promise<void>) | undefined
}


/**
 * Constants
 */
const { useForm } = ProForm


/**
 * Component
 */
const AddUserModalForm = ({ reloadTable }: AddUserFormProps): JSX.Element => {

  /**
   * Utils
   */
  const intl = useIntl()


  /**
   * Modal
   */
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const modalProps: ModalFormProps['modalProps'] = {
    destroyOnClose: true,
    onCancel: () => void setModalVisible(false)
  }


  /**
   * Add user
   */
  const _addUser = async (err: ValidateErrorEntity<AddUserData>): Promise<void> => {
    const { errorFields, values } = err

    if (errorFields.length !== 0) {
      void message.error(intl.formatMessage({ id: 'pages.register.error-message.data.invalid' }))
      return Promise.reject()
    }

    if (values.username === '') {
      values.username = undefined
    }

    let data: ResponseData

    try {
      data = await addUserAPI(values)
    } catch (err) {
      void message.error(intl.formatMessage({ id: 'error.network' }), 3)
      return Promise.reject()
    }

    if (data.code !== 200) {
      void message.error(intl.formatMessage({ id: data.msg }), 3)
      return Promise.reject()
    }

    void message.success(intl.formatMessage({ id: data.msg }), 3)
    await reloadTable?.()
    setModalVisible(false)

    return Promise.resolve()
  }

  const { loading: addingUser, run: addUser } = useRequest(_addUser, {
    manual: true,
    onError: () => { /* Prevent printing meaningless error in console */ }
  })


  /**
   * Form
   */
  const [formInstance] = useForm()

  const formSubmitter: ModalFormProps['submitter'] = {
    searchConfig: {
      submitText: intl.formatMessage({ id: 'pages.admin.user-list.users.add.submit.text' })
    },
    submitButtonProps: {
      loading: addingUser
    }
  }


  /**
   * Component
   */
  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => void setModalVisible(true)}
      >
        {intl.formatMessage({ id: 'pages.admin.user-list.table.actions.add-users' })}
      </Button>
      <ModalForm<AddUserData>
        autoFocusFirstInput
        form={formInstance}
        modalProps={modalProps}
        preserve={false}
        submitter={formSubmitter}
        submitTimeout={3000}
        title={intl.formatMessage({ id: 'pages.admin.user-list.users.add.title' })}
        visible={modalVisible}
        onFinishFailed={err => void addUser(err)}
      >
        <EmailInput register />
        <UsernameInput
          editUser
          register
          placeholder={intl.formatMessage({ id: 'pages.admin.user-list.users.add.username.placeholder' })}
        />
        <PasswordInput register formInstance={formInstance} />
      </ModalForm>
    </>
  )
}

export default AddUserModalForm
