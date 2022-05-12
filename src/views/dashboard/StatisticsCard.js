import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { ClockCircleOutlined, ProjectOutlined, HistoryOutlined } from '@ant-design/icons'

// ** Custom Imports
import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from 'src/utils/notification'
import Loading from 'src/utils/loading'

const StatisticsCard = () => {
  const [day, setDay] = useState(0)
  const [salary, setSalary] = useState(0)
  const [project, setProject] = useState(0)
  const [time, setTime] = useState(0)
  const [loading_spin, setLoadingSpin] = useState(true)
  useEffect(() => {
    const staff_id = localStorage.getItem('staff_id')

    API({ REGISTER_URL: '/user/dashboard/?staff=' + staff_id, ACTION: 'GET' })
      .then(results => {
        setDay(results.data.total_day_off_year)
        console.log(results.data.total_day_off_year)
        setSalary(results.data.total_salary)
        setProject(results.data.total_project)
        setTime(results.data.total_time_keeping)
        setLoadingSpin(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  const salesData = [
    {
      stats:  day,
      title: 'Số ngày nghỉ',
      color: 'primary',
      icon: <ClockCircleOutlined style={{ fontSize: '1.75rem' }} />
    },
    {
      stats: salary,
      color: 'info',
      title: 'Số kỳ lương',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: project,
      title: 'Dự án',
      color: 'success',
      icon: <ProjectOutlined style={{ fontSize: '1.75rem' }} />
    },
    {
      stats: time + '(giờ)',
      color: 'warning',
      title: 'Thời gian làm dự án',
      icon: <HistoryOutlined style={{ fontSize: '1.75rem' }} />
    }
  ]
  return (
    <>
      <Loading loading={loading_spin} />

      <Card>
        <CardHeader
          title='Thống kê'
          action={
            <IconButton
              size='small'
              aria-label='settings'
              className='card-more-options'
              sx={{ color: 'text.secondary' }}
            >
              <DotsVertical />
            </IconButton>
          }
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: '2rem !important',
              letterSpacing: '0.15px !important'
            }
          }}
        />
        <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {salesData.map((item, index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 44,
                      height: 44,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `${item.color}.main`
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='caption'>{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default StatisticsCard
