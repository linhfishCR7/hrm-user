// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Tài Khoản Và Lý Lịch',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Quản Lý'
    },
    {
      title: 'Phép Năm',
      icon: CubeOutline,
      path: '/day-off-year',
      // openInNewTab: true
    },
    {
      title: 'Bảng Lương',
      icon: CubeOutline,
      path: '/salary',
      // openInNewTab: true
    }
  ]
}

export default navigation
