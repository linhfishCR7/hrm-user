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
      title: 'Cập nhật phép năm',
      icon: ClockCircleOutlined,
      path: '/day-off-year',
      // openInNewTab: true
    },
    {
      sectionTitle: 'Quản Lý'
    },
    {
      title: 'Phiếu phép năm',
      icon: ClockCircleOutlined,
      path: '/day-off-year-report',
      // openInNewTab: true
    },
    {
      title: 'Phiếu lương',
      icon: DollarOutlined,
      path: '/salary',
      // openInNewTab: true
    }
    ,
    {
      title: 'Phiếu CV',
      icon: IdcardOutlined,
      path: '/cv',
      // openInNewTab: true
    }
    ,
    {
      title: 'Phiếu hợp đồng',
      icon: FileProtectOutlined,
      path: '/contract',
      // openInNewTab: true
    }
  ]
}

export default navigation
