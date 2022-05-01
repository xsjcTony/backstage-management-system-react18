import menu from './en-US/menu'
import pages from './en-US/pages'


const enUS: Record<string, string> = {
  title: `Aelita's BMS`,
  'header.title': `Aelita's Backstage Management System`,
  'header.user-dropdown.logout': 'Log out',
  ...pages,
  ...menu
}

export default enUS
