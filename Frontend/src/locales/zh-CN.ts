import menu from './zh-CN/menu'
import pages from './zh-CN/pages'


const zhCN: Record<string, string> = {
  title: `后台管理系统`,
  'header.title': `Aelita's 后台管理系统`,
  'header.user-dropdown.logout': '退出登录',
  ...pages,
  ...menu
}

export default zhCN
