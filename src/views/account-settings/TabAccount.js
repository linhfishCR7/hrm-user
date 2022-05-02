// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Customer Imports
import axios from 'src/utils/axios'
import getProfile from 'src/utils/getProfile'
import openNotificationWithIcon from 'src/utils/notification'
import Loading from 'src/utils/loading'


// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))


const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('')
  const [date, setDate] = useState(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [dayOfBirth, setDayOfBirth] = useState(null)
  const [key, setKey] = useState('')
  const [loading_spin, setLoadingSpin] = useState(true)

  useEffect(() => {
    getProfile()
      .then((results) => {
        setEmail(results.data.email)
        setFirstName(results.data.first_name)
        setLastName(results.data.last_name)
        setPhone(results.data.phone)
        setImgSrc(results.data.image.image_s3_url)
        setDayOfBirth(results.data.date_of_birth)
        setLoadingSpin(false)
      })
      .catch( (error) => {
        if (error.response) {
          // console.log(error.response.data.code)
          // console.log(error.response.status)
          // console.log(error.response.headers)
          if (error.response.data.code === 'AUTH_0') {
            user.signOut()
            localStorage.removeItem('token')
            navigate('/pages/login')
          }
        }
      })
  }, [])

  const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Ngày Sinh' fullWidth {...props} value={dayOfBirth}
    onChange={event => setDayOfBirth(event.target.value)} />
  })

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      setKey(files[0].name)
      const file_name = files[0].name
      axios
      .post('/common/upload/policy/', {
        file_name,
      })
      .then((results) => {
        var returnData = results.data
        var signedRequest = returnData.url
        var content = returnData.fields
        var key = content.key
        var formData = new FormData()
        Object.keys(returnData.fields).forEach((key) =>
          formData.append(key, returnData.fields[key]),
        )
        formData.append('file', files[0])

        fetch(signedRequest, {
          method: 'POST',
          body: formData,
        })
          .then(async (result) => {
            setKey(files[0].name)
            setImgSrc(signedRequest + key)
            // reader.onload = () => setImgSrc(signedRequest + key)
            console.log(signedRequest + key)
            const key_data = { image: key }
            console.log(key_data)
            updateProfile(key_data)
            openNotificationWithIcon({
              type: 'success',
              message: 'Upload hình đại diện thành công!!!',
              description: '',
              placement: 'topRight',
            })
          })
          .catch((error) => {
            message.error({
              content: JSON.stringify(error),
              duration: 5,
              maxCount: 1,
              className: 'custom-class',
              style: {
                marginTop: '20vh',
              },
            })
          })
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Upload hình đại diện không thành công!!!',
          description: 'Chỉ hỗ trợ hình ảnh dạng png, jepg và jpg',
          placement: 'topRight',
        })
      })
      reader.onload = () => setImgSrc(imgSrc)
    }
  }

  const updateProfile = async (key) => {
    const token = localStorage.getItem('token')
    await axios.put('/auth/profile/', key, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const data = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      date_of_birth: dayOfBirth,
    }
    console.log(data)
    updateProfile(data)
      .then((res) => {
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
      })
      .catch( (error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error.response.data.message,
            placement: 'topRight',
          })
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
        }
      })
  }


  return (
    <>
    <Loading loading={loading_spin} />
    <CardContent>
      <form onSubmit={onSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc ? imgSrc : '/images/avatars/1.png'} alt='Hình Đại Diện' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload Hình Đại Diện
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg, image/jpg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Chấp nhận PNG, JPG và JPEG.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              type='text'
              label='Họ' 
              placeholder='Họ' 
              value={lastName}
              onChange={event => setLastName(event.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              type='text'
              label='Tên' 
              placeholder='Tên' 
              value={firstName}
              onChange={event => setFirstName(event.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='info@example.com'
              value={email}
              onChange={event => setEmail(event.target.value)}
              readOnly='readonly'
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              type='tel' 
              label='Phone' 
              placeholder='+84456789067'
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} type="submit">
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
    </>
    
  )
}

export default TabAccount
