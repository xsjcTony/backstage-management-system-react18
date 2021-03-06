const pages: Record<string, string> = {
  // 404
  'pages.404.description': '对不起, 您所访问的页面不存在',
  'pages.404.back': '返回首页',

  // Home
  'pages.home.title': '首页',
  'pages.home.login': '登录',
  'pages.home.register': '注册',
  'pages.home.dashboard': '管理页',
  'pages.home.hi': '您好, ',
  'pages.home.welcome': '欢迎, 如果这是您第一次体验本系统, 请注册账号并登录',
  'pages.home.logout': '退出登录',

  // Admin
  'pages.admin.home': '首页',

  // Welcome
  'pages.admin.welcome.title': '欢迎',
  'pages.admin.welcome.guide': '如果您是第一次注册完毕并登录, 您会发现除了欢迎页面之外什么都没有, 这是正常的. 请登出(在右上角, 鼠标悬浮于您的账号/邮箱)退出, 并登录管理员账号, 为您的账号赋予一些您想要的角色(通过用户管理)以体验本后台管理系统',
  'pages.admin.welcome.admin-account': '用户名: admin, 密码: 123456a.',

  // User List
  'pages.admin.user-list.title': '用户列表',
  'pages.admin.user-list.table.header.avatar': '头像',
  'pages.admin.user-list.table.header.username': '用户名',
  'pages.admin.user-list.table.header.email': '邮箱地址',
  'pages.admin.user-list.table.header.role': '角色',
  'pages.admin.user-list.table.header.state': '状态',
  'pages.admin.user-list.table.header.actions.edit': '编辑',
  'pages.admin.user-list.table.header.actions.assign-roles': '分配角色',
  'pages.admin.user-list.table.header.actions.delete': '删除',
  'pages.admin.user-list.table.actions.add-users': '添加用户',
  'pages.admin.user-list.table.actions.import-users': '导入用户',
  'pages.admin.user-list.table.actions.export-users': '导出用户',
  'pages.admin.user-list.user.state.updated': '用户状态更新成功',
  'pages.admin.user-list.users.import.file.type': '用户数据必须为".xlsx"文件',
  'pages.admin.user-list.users.import.file.size': '文件大小不能超过500kb',
  'pages.admin.user-list.users.add.title': '添加用户',
  'pages.admin.user-list.users.add.username.placeholder': '用户名 (可选)',
  'pages.admin.user-list.users.add.submit.text': '添加用户',
  'pages.admin.user-list.users.add.data.invalid': '用户信息不正确',
  'pages.admin.user-list.users.avatar.upload.type': '头像必须为".png"或".jpg"的文件',
  'pages.admin.user-list.users.avatar.upload.size': '图片大小不能超过2MB',
  'pages.admin.user-list.users.avatar.upload.text': '上传头像',
  'pages.admin.user-list.users.edit.title': '编辑用户',
  'pages.admin.user-list.users.edit.submit.text': '编辑用户',
  'pages.admin.user-list.users.assign-roles.title': '分配角色',
  'pages.admin.user-list.users.assign-roles.submit.text': '分配角色',

  // Role List
  'pages.admin.role-list.title': '角色列表',
  'pages.admin.role-list.table.header.role-name': '角色名称',
  'pages.admin.role-list.table.header.role-description': '角色描述',
  'pages.admin.role-list.table.header.state': '状态',
  'pages.admin.role-list.table.header.actions.edit': '编辑',
  'pages.admin.role-list.table.header.actions.assign-privileges': '分配权限',
  'pages.admin.role-list.table.header.actions.assign-menus': '分配菜单',
  'pages.admin.role-list.table.header.actions.delete': '删除',
  'pages.admin.role-list.table.actions.add-roles': '添加角色',
  'pages.admin.role-list.role.state.updated': '角色状态更新成功',
  'pages.admin.role-list.roles.add.title': '添加角色',
  'pages.admin.role-list.roles.add.submit.text': '添加角色',
  'pages.admin.role-list.roles.add.data.invalid': '角色信息不正确',
  'pages.admin.role-list.placeholder.role-name': '角色名称',
  'pages.admin.role-list.placeholder.role-description': '角色描述',
  'pages.admin.role-list.error-message.role-name.missing': '请输入角色名称',
  'pages.admin.role-list.error-message.role-description.missing': '请输入角色描述',
  'pages.admin.role-list.roles.edit.title': '编辑角色',
  'pages.admin.role-list.roles.edit.submit.text': '编辑角色',
  'pages.admin.role-list.roles.assign-privileges.title': '分配权限',
  'pages.admin.role-list.roles.assign-privileges.submit.text': '分配权限',
  'pages.admin.role-list.roles.assign-menus.title': '分配菜单',
  'pages.admin.role-list.roles.assign-menus.submit.text': '分配菜单',
  'pages.admin.role-list.table.tooltip': '点击 "+" 按钮以查看角色拥有的权限和菜单',
  'pages.admin.role-list.table.assigned-privileges': '分配的权限',
  'pages.admin.role-list.table.assigned-menus': '分配的菜单',

  // Privilege List
  'pages.admin.privilege-list.title': '权限列表',
  'pages.admin.privilege-list.table.header.level': '等级',
  'pages.admin.privilege-list.table.header.privilege-name': '权限名称',
  'pages.admin.privilege-list.table.header.privilege-description': '权限描述',
  'pages.admin.privilege-list.table.header.request-method': '请求方法',
  'pages.admin.privilege-list.table.header.privilege-url': '请求地址',
  'pages.admin.privilege-list.table.header.state': '状态',
  'pages.admin.privilege-list.table.header.actions.edit': '编辑',
  'pages.admin.privilege-list.table.header.actions.delete': '删除',
  'pages.admin.privilege-list.table.header.parentId': '父权限',
  'pages.admin.privilege-list.table.level.level': '等级',
  'pages.admin.privilege-list.table.actions.add-privilege': '添加权限',
  'pages.admin.privilege-list.privilege.state.updated': '权限状态更新成功',
  'pages.admin.privilege-list.privileges.add.submit.text': '添加权限',
  'pages.admin.privilege-list.privileges.add.title': '添加权限',
  'pages.admin.privilege-list.privileges.edit.submit.text': '编辑权限',
  'pages.admin.privilege-list.privileges.edit.title': '编辑权限',
  'pages.admin.privilege-list.privileges.add.data.invalid': '权限信息不正确',
  'pages.admin.privilege-list.placeholder.privilege-name': '权限名称',
  'pages.admin.privilege-list.placeholder.privilege-description': '权限描述',
  'pages.admin.privilege-list.placeholder.parent-privilege': '父权限',
  'pages.admin.privilege-list.placeholder.request-method': '请求方法',
  'pages.admin.privilege-list.placeholder.privilege-url': '请求地址 (URL)',
  'pages.admin.privilege-list.error-message.privilege-name.missing': '请输入权限名称',
  'pages.admin.privilege-list.error-message.privilege-description.missing': '请输入权限描述',
  'pages.admin.privilege-list.error-message.parent-privilege.missing': '请选择父权限',
  'pages.admin.privilege-list.error-message.request-method.missing': '请选择请求方法',
  'pages.admin.privilege-list.error-message.privilege-url.missing': '请输入请求地址 (URL)',
  'pages.admin.privilege-list.error-message.privilege-url.invalid': '请求地址必须由"/"打头, 并且不能包含"空格"',

  // Menu List
  'pages.admin.menu-list.title': '菜单列表',
  'pages.admin.menu-list.table.header.level': '等级',
  'pages.admin.menu-list.table.header.menu-name': '菜单名称',
  'pages.admin.menu-list.table.header.menu-name.tooltip': '国际化 (i18n) 的 id',
  'pages.admin.menu-list.table.header.menu-description': '菜单描述',
  'pages.admin.menu-list.table.header.menu-key': '菜单键',
  'pages.admin.menu-list.table.header.menu-key.tooltip': '一级菜单为 "键", 二级菜单为 "路径"',
  'pages.admin.menu-list.table.header.menu-icon': '菜单图标',
  'pages.admin.menu-list.table.header.state': '状态',
  'pages.admin.menu-list.table.header.parentId': '父菜单',
  'pages.admin.menu-list.table.level.level': '等级',
  'pages.admin.menu-list.table.menu-icon.invalid': '非antd-icon图标',

  // Login
  'pages.login.title': '登录',
  'pages.login.placeholder.username': '用户名',
  'pages.login.placeholder.password': '密码',
  'pages.login.placeholder.email': '邮箱 example@domain.xxx',
  'pages.login.placeholder.captcha': '验证码',
  'pages.login.login-type.account': '账号密码登录',
  'pages.login.login-type.email': '邮箱登录',
  'pages.login.actions.remember-me': '记住我',
  'pages.login.actions.forgot-password': '忘记密码',
  'pages.login.other': '其他登录方式',
  'pages.login.register': '创建一个新账号',
  'pages.login.login': '登录',
  'pages.login.or': '或',
  'pages.login.error-message.username.missing': '请输入用户名',
  'pages.login.error-message.password.missing': '请输入密码',
  'pages.login.error-message.email.missing': '请输入邮箱',
  'pages.login.error-message.email.invalid': '邮箱不正确',
  'pages.login.error-message.captcha.missing': '请输入验证码',
  'pages.login.error-message.captcha.invalid': '验证码不正确',
  'pages.login.error-message.data.invalid': '登录数据不正确',

  // Register
  'pages.register.title': '注册',
  'pages.register.placeholder.username': '用户名',
  'pages.register.placeholder.password': '密码',
  'pages.register.placeholder.password-check': '确认密码',
  'pages.register.placeholder.email': '邮箱 example@domain.xxx',
  'pages.register.placeholder.captcha': '验证码',
  'pages.register.register-type.account': '账号密码注册',
  'pages.register.register-type.email': '邮箱注册',
  'pages.register.register': '注册',
  'pages.register.login': '已经拥有账号? 登录',
  'pages.register.or': '或',
  'pages.register.agreement.text': '我同意',
  'pages.register.agreement.terms': '条款和条件',
  'pages.register.password.strength': '强度',
  'pages.register.password.low': '低',
  'pages.register.password.medium': '中',
  'pages.register.password.high': '高',
  'pages.register.error-message.username.missing': '请输入用户名',
  'pages.register.error-message.username.rule': '用户名必须由a-z, A-Z或0-9组成, 并且长度在6-20个字符之间',
  'pages.register.error-message.password.missing': '请输入密码',
  'pages.register.error-message.password.rule': '密码必须包括字母, 数字和特殊符号, 并且长度在8-20个字符之间',
  'pages.register.error-message.password-check.missing': '请再次输入密码',
  'pages.register.error-message.password-check.invalid': '密码不匹配',
  'pages.register.error-message.email.missing': '请输入邮箱',
  'pages.register.error-message.email.invalid': '邮箱地址不正确',
  'pages.register.error-message.captcha.missing': '请输入验证码',
  'pages.register.error-message.captcha.invalid': '验证码不正确',
  'pages.register.error-message.agreement.missing': '请同意"条款和条件"',
  'pages.register.error-message.data.invalid': '注册数据不正确',
  'pages.register.captcha.button.send': '发送验证码',
  'pages.register.captcha.button.resend': '重新发送验证码',
  'pages.register.message.send-captcha.success': '验证码发送成功',
  'pages.register.message.send-captcha.error': '验证码发送失败',

  // OAuth
  'pages.oauth.title': '绑定账号',
  'pages.oauth.id.invalid': 'OAuth ID 不正确',
  'pages.oauth.github.subtitle': '绑定您的账号到此GitHub',

  // Reset password
  'pages.reset-password.title': '重置密码',
  'pages.reset-password.verify.subtitle': '重置密码 - 验证您的邮箱',
  'pages.reset-password.verify.verify': '验证',
  'pages.reset-password.reset.subtitle': '重置密码',
  'pages.reset-password.reset.reset': '重置密码',
  'pages.reset-password.reset.email.not-verified': '邮箱地址未验证'
}

export default pages
