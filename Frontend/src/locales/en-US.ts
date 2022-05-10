import menu from './en-US/menu'
import message from './en-US/message'
import pages from './en-US/pages'


const enUS: Record<string, string> = {
  title: `Aelita's BMS`,
  subtitle: `Built by React 18 + TypeScript, Powered by Vite`,
  'header.title': `Aelita's Backstage Management System`,
  'header.user-dropdown.logout': 'Log out',
  'error.network': 'Network error',
  'error.need-login': 'Please login first',
  'error.no-privilege': 'You are not allowed to visit',
  ...pages,
  ...menu,
  ...message
}

export default enUS
