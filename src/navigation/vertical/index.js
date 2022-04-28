// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    }
  ]
}

export default navigation
