// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Custom

import UserPool from 'src/utils/UserPool'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import axios from 'src/utils/axios'
import getProfile from 'src/utils/getProfile'
import openNotificationWithIcon from 'src/utils/notification'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const user_logged = UserPool.getCurrentUser()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')
  const [departments, setDepartments] = useState([])
  const [code, setCode] = useState('')
  const [user, setUser] = useState('')
  const [success, setSuccess] = useState(false)
  const [disable, setDisable] = useState(false)
  const [visibleForm, setVisibleForm] = useState(true)

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const onPrivacy = event => {
    setDisable(!disable)
  }

  const getDepartment = async () => {
    const REGISTER_URL = '/hrm/departments/list/'

    const result = await axios.get(REGISTER_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })

    return result
  }

  useEffect(() => {
    if (user_logged) {
      router.push('/')
    }
    getDepartment().then(results => {
      setDepartments(results.data.results)
    })
  }, [])

  const onSubmit = event => {
    event.preventDefault()

    UserPool.signUp(email, values.password, [], null, (err, data) => {
      if (err) {
        openNotificationWithIcon({
          type: 'error',
          message: err.message || JSON.stringify(err),
          description: '',
          placement: 'topRight'
        })
      } else {
        openNotificationWithIcon({
          type: 'success',
          message: 'Vui lòng kiểm tra email để lấy mã code xác nhận',
          description: '',
          placement: 'topRight'
        })
        setSuccess(true)
        setUser(data.user)
      }
    })
  }

  const onSubmitConfirm = event => {
    event.preventDefault()
    user.confirmRegistration(code, true, function (err, result) {
      if (err) {
        openNotificationWithIcon({
          type: 'error',
          message: err.message || JSON.stringify(err),
          description: '',
          placement: 'topRight'
        })
      } else {
        setVisibleForm(false)
      }
    })
  }

  const onSubmitCreateStaff = async event => {
    event.preventDefault()
    const newItem = { first_name: firstName, last_name: lastName, email: email, department: department }
    await axios
      .post('/auth/signup/', newItem, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        router.push('/pages/login')
      })
      .catch(function (error) {
        openNotificationWithIcon({
          type: 'error',
          message: error,
          description: '',
          placement: 'topRight'
        })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        {visibleForm ? (
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width={35}
                height={29}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                    <g id='logo' transform='translate(95.000000, 50.000000)'>
                      <path
                        id='Combined-Shape'
                        fill={theme.palette.primary.main}
                        d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                        transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                        transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.15'
                        fill={theme.palette.common.white}
                        d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.35'
                        fill={theme.palette.common.white}
                        transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                        d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            {success ? (
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Xác Nhận Tài Khoản 🚀
                </Typography>
                <Typography variant='body2'>Nhập mã code từ email của bạn</Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 6 }}>
                <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Tạo Tài Khoản Nhân Viên 🚀
                </Typography>
                <Typography variant='body2'>Các bước rất đơn giản</Typography>
              </Box>
            )}

            <form autoComplete='off' onSubmit={onSubmit} className={success ? 'hide' : ''}>
              <TextField
                fullWidth
                autoFocus
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-register-password'>Mật Khẩu</InputLabel>
                <OutlinedInput
                  label='Mật khẩu'
                  value={values.password}
                  id='auth-register-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox onClick={onPrivacy} checked={disable} />}
                label={
                  <Fragment>
                    <span>Tôi Đồng Ý </span>
                    <Link href='/privacy-policy-terms' passHref>
                      <LinkStyled>Chính Sách & Điều Khoản</LinkStyled>
                    </Link>
                  </Fragment>
                }
              />
              <Button
                fullWidth
                size='large'
                type='submit'
                disabled={disable ? false : true}
                variant='contained'
                sx={{ marginBottom: 7 }}
              >
                Đăng Ký
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Bạn đã có tài khoản?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/pages/login'>
                    <LinkStyled>Hãy quay về đăng nhập</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
            <form autoComplete='off' onSubmit={onSubmitConfirm} className={success ? '' : 'hide'}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
              <TextField
                fullWidth
                type='number'
                label='Code'
                sx={{ marginBottom: 4 }}
                value={code}
                onChange={event => setCode(event.target.value)}
                required
              />

              <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                Xác Nhận
              </Button>
            </form>
          </CardContent>
        ) : (
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width={35}
                height={29}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                    <g id='logo' transform='translate(95.000000, 50.000000)'>
                      <path
                        id='Combined-Shape'
                        fill={theme.palette.primary.main}
                        d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                        transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                        transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.15'
                        fill={theme.palette.common.white}
                        d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.35'
                        fill={theme.palette.common.white}
                        transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                        d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Tạo Hồ Sơ Nhân Viên 🚀
              </Typography>
              <Typography variant='body2'>Còn bước cuối cùng để hoàn tất</Typography>
            </Box>

            <form autoComplete='off' onSubmit={onSubmitCreateStaff}>
              {/* <TextField autoFocus fullWidth id='username' label='Username' sx={{ marginBottom: 4 }} /> */}
              <TextField
                fullWidth
                type='email'
                label='Email'
                sx={{ marginBottom: 4 }}
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
              />
              <TextField
                fullWidth
                type='text'
                label='Họ'
                sx={{ marginBottom: 4 }}
                value={lastName}
                onChange={event => setLastName(event.target.value)}
                required
              />
              <TextField
                fullWidth
                type='text'
                label='Tên'
                sx={{ marginBottom: 4 }}
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Bộ Phận</InputLabel>
                <Select label='Bộ Phận' name='department' onChange={event => setDepartment(event.target.value)}>
                  <MenuItem key='0' value=''>
                    Chọn Bộ Phận
                  </MenuItem>
                  {departments.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                Tạo Hồ Sơ
              </Button>
            </form>
          </CardContent>
        )}
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
