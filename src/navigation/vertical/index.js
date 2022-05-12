// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import { Table, Space, Card, Avatar, Divider, Collapse, Input, Popover, Button } from 'antd'
import {
  EditOutlined,
  ThunderboltOutlined,
  CalculatorOutlined,
  DeleteOutlined,
  RiseOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  FileProtectOutlined,
} from '@ant-design/icons'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Thông tin tài khoản',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Quản Lý'
    },
    {
      title: 'Phép năm',
      icon: ClockCircleOutlined,
      path: '/day-off-year',
      // openInNewTab: true
    },
    {
      title: 'Bảng lương',
      icon: DollarOutlined,
      path: '/salary',
      // openInNewTab: true
    }
    ,
    {
      title: 'CV',
      icon: IdcardOutlined,
      path: '/cv',
      // openInNewTab: true
    }
    ,
    {
      title: 'Hợp đồng lao động',
      icon: FileProtectOutlined,
      path: '/cv',
      // openInNewTab: true
    }
  ]
}

export default navigation
