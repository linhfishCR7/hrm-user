// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import BookEdit from 'mdi-material-ui/BookEdit'
import BookRemove from 'mdi-material-ui/BookRemove'
import BookSettings from 'mdi-material-ui/BookSettings'
import BookPlus from 'mdi-material-ui/BookPlus'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'


// ** Custom Imports
import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
import openNotificationWithIcon from 'src/utils/notification'
import Loading from 'src/utils/loading'

// ** Ant Design Import
import { Modal, Input } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CButton,
  CRow,
  CCol,
  CTooltip,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CSpinner,
  CContainer,
  CFormLabel,
  CFormText,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  EditOutlined,
  ThunderboltOutlined,
  CalculatorOutlined,
  RiseOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  FileProtectOutlined,
  PlusCircleOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons'

const { TextArea } = Input

const DayOffYear = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [loading_spin, setLoadingSpin] = useState(true)
  const [date, setDate] = useState(null)
  const [reason, setReason] = useState('')
  const [contact, setContact] = useState('')
  const [hand_over, setHandOver] = useState('')
  const [status, setStatus] = useState(false)
  const [id, setId] = useState('')

  const setOpenModalVisible = (item) =>  {
    setVisible(true)
    setId(item.id)
  }

  const setCloseModalVisible = () =>  {
    setVisible(false)
  }

  const setOpenModalVisibleAdd = () =>  {
    setVisibleAdd(true)
  }

  const setCloseModalVisibleAdd = () =>  {
    setVisibleAdd(false)
  }

  const setOpenModalVisibleEdit = (item) =>  {
    API({ REGISTER_URL: '/user/day-off-years/' + item.id + '/' , ACTION: 'GET' })
    .then(results => {
      setDate(results.data.date)
      setReason(results.data.reason)
      setContact(results.data.contact)
      setHandOver(results.data.hand_over)
      setStatus(results.data.status)
      setId(results.data.id)
      setStatus(results.data.status)

    })
    .catch((error) => {console.log(error)})
    setVisibleEdit(true)

  }

  const setCloseModalVisibleEdit = () =>  {
    setVisibleEdit(false)
  }

  // ** Hook
  const router = useRouter()


  const handleChangePage = (event, newPage) => {
    const staff_id = localStorage.getItem('staff_id')
    setPage(newPage)
    API({
      REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id +'&page=' + (newPage + 1) + '&page_size=' + rowsPerPage,
      ACTION: 'GET'
    })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    API({
      REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id +'&page=' + (page + 1) + '&page_size=' + +event.target.value,
      ACTION: 'GET'
    })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
    setPage(0)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const staff_id = localStorage.getItem('staff_id')

    API({ REGISTER_URL: '/user/day-off-years/' + id + '/', ACTION: 'DELETE' })
      .then((res) => {
        API({ REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id , ACTION: 'GET' })
        .then(results => {
          setData(results.data.results)
          setCount(results.data.count)
        })
        .catch((error) => {console.log(error)})
        openNotificationWithIcon({
          type: 'success',
          message: 'Xoá dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setVisible(false)
      })
      .catch((error) => {
        openNotificationWithIcon({
          type: 'error',
          message: 'Xoá dữ liệu không thành công!!!',
          description: 'Xoá chi tiết phép năm trước',
          placement: 'topRight',
        })
        setVisible(false)
      })
  }

  const handleDetail = (item) => {
    localStorage.setItem('day_off_year_id', item.id)
    router.push('/day-off-year-detail')
  }

  const handleAddSubmit = (event) => {
    event.preventDefault()

    const staff_id = localStorage.getItem('staff_id')
    
    const newData = {
      date: date,
      reason: reason,
      contact: contact,
      hand_over: hand_over,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/user/day-off-years/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {
        API({ REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id , ACTION: 'GET' })
        .then(results => {
          setData(results.data.results)
          setCount(results.data.count)
        })
        .catch((error) => {console.log(error)})
        openNotificationWithIcon({
          type: 'success',
          message: 'Thêm dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setCloseModalVisibleAdd()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          setCloseModalVisibleAdd()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          setCloseModalVisibleAdd()
        }
      })
  }

  const handleEditSubmit = (event) => {
    const staff_id = localStorage.getItem('staff_id')

    event.preventDefault()

    const newData = {
      date: date,
      reason: reason,
      contact: contact,
      hand_over: hand_over,
      staff: staff_id,
    }
    API({
      REGISTER_URL: '/user/day-off-years/' + id + '/',
      ACTION: 'PUT',
      DATA: newData,
    })
      .then((res) => {
        API({ REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id , ACTION: 'GET' })
        .then(results => {
          setData(results.data.results)
          setCount(results.data.count)
        })
        .catch((error) => {console.log(error)})
        openNotificationWithIcon({
          type: 'success',
          message: 'Cập nhật dữ liệu thành công!!!',
          description: '',
          placement: 'topRight',
        })
        setCloseModalVisibleEdit()
      })
      .catch((error) => {
        if (error.response.status === 400) {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          setCloseModalVisibleEdit()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: '',
            placement: 'topRight',
          })
          setCloseModalVisibleEdit()
        }
      })
  }


  useEffect(() => {
    const staff_id = localStorage.getItem('staff_id')

    API({ REGISTER_URL: '/user/day-off-years/?staff__id=' + staff_id, ACTION: 'GET' })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)
        setLoadingSpin(false)
      })
      .catch((error) => {console.log(error)})
  }, [])


  return (
    <>
      <Loading loading={loading_spin} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Danh sách phép năm' titleTypographyProps={{ variant: 'h6' }} />
            <Button variant='contained' sx={{ marginBottom: 7, marginLeft: 7 }} onClick={() => setOpenModalVisibleAdd()}>
            <PlusCircleOutlined /> Thêm phép năm
            </Button>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell key='9' align='left' sx={{ minWidth: 170 }}>
                        Chức Năng
                      </TableCell>
                      <TableCell key='1' align='left' sx={{ minWidth: 170 }}>
                        Ngày Viết Đơn
                      </TableCell>
                      <TableCell key='2' align='left' sx={{ minWidth: 170 }}>
                        Lí Do
                      </TableCell>
                      <TableCell key='3' align='left' sx={{ minWidth: 170 }}>
                        Người Liên Hệ
                      </TableCell>
                      <TableCell key='4' align='left' sx={{ minWidth: 170 }}>
                        Người Đảm Nhiệm
                      </TableCell>
                      <TableCell key='7' align='left' sx={{ minWidth: 170 }}>
                        Trạng Thái
                      </TableCell>
                      <TableCell key='8' align='left' sx={{ minWidth: 170 }}>
                        Người Xác Nhận
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(item => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={item.index}>
                          <TableCell align='left' sx={{ minWidth: 250 }}>
                            <Tooltip arrow title='Chi Tiết Phép Năm' placement='top'>
                              <Button variant='contained' color='info' key='1' sx={{ marginRight: 1 }} size='small' onClick={() => handleDetail(item)}>
                              <InfoCircleOutlined />
                              </Button>
                            </Tooltip>

                            <Tooltip arrow title='Cập Nhật Dữ Liệu' placement='top'>
                              <Button variant='contained' color='warning' key='2' sx={{ marginRight: 1 }} size='small' onClick={() => setOpenModalVisibleEdit(item)}>
                              <EditOutlined />
                              </Button>
                            </Tooltip>
                            <Tooltip arrow title='Xoá Dữ Liệu' placement='top'>
                              <Button
                                variant='contained'
                                color='error'
                                key='3'
                                size='small'
                                onClick={() => setOpenModalVisible(item)}
                              >
                                <DeleteOutlined />
                              </Button>
                            </Tooltip>
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.date}
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.reason}
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.contact}
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.hand_over}
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.status ? 'Đã Duyệt' : 'Không Duyệt'}
                          </TableCell>
                          <TableCell align='left' sx={{ minWidth: 170 }}>
                            {item.approved_by ? item.approved_by.user.last_name + ' ' + item.approved_by.user.first_name : ''}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component='div'
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Card>
        </Grid>
      </Grid>

      <Modal
          title="Xoá Phép Năm"
          style={{ top: 20 }}
          visible={visible}
          onOk={handleDelete}
          onCancel={() => setCloseModalVisible(false)}
        >
          <h2 style={{ textAlign: 'center' }}>Bạn Có Chắc Chắn Xoá?</h2>
      </Modal>
      
      <Modal
        title="Thêm Phép Năm"
        style={{ top: 20 }}
        visible={visibleAdd}
        width={1000}
        zIndex={9999}
        onOk={handleAddSubmit}
        onCancel={() => setCloseModalVisibleAdd(false)}
      >
        <CForm onSubmit={handleAddSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày"
                      autoComplete="date"
                      name="date"
                      onChange={(event)=> setDate(event.target.value)}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày tạo phiếu xin phép bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Người Liên Hệ</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Người Liên Hệ"
                      autoComplete="contact"
                      name="contact"
                      onChange={(event)=> setContact(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Người liên hệ có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Người Đảm Nhiệm</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Người Đảm Nhiệm"
                      autoComplete="hand_over"
                      name="hand_over"
                      onChange={(event)=> setHandOver(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Người đảm nhiệm có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Lí Do</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Lí Do Xin Nghỉ"
                      autoComplete="reason"
                      name="reason"
                      onChange={(event)=> setReason(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Lí do xin phép nghỉ bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
            </CForm>{' '}
      </Modal>
      <Modal
        title="Cập Nhật Phép Năm"
        style={{ top: 20 }}
        visible={visibleEdit}
        width={1000}
        zIndex={9999}
        onOk={handleEditSubmit}
        onCancel={() => setCloseModalVisibleEdit(false)}
      >
        <CForm onSubmit={handleEditSubmit}>
              <CContainer>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Ngày"
                      autoComplete="date"
                      name="date"
                      value={date}
                      onChange={(event)=> setDate(event.target.value)}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày tạo phiếu xin phép bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Người Liên Hệ</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Người Liên Hệ"
                      autoComplete="contact"
                      name="contact"
                      value={contact}
                      onChange={(event)=> setContact(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Người liên hệ có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Người Đảm Nhiệm</CFormLabel>
                    <CFormInput
                      type="text"
                      placeholder="Người Đảm Nhiệm"
                      autoComplete="hand_over"
                      name="hand_over"
                      value={hand_over}
                      onChange={(event)=> setHandOver(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Người đảm nhiệm có thể nhập hoặc không
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Lí Do</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Lí Do Xin Nghỉ"
                      autoComplete="reason"
                      name="reason"
                      value={reason}
                      onChange={(event)=> setReason(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Lí do xin phép nghỉ bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
            </CForm>{' '}
      </Modal>
    </>
  )
}

export default DayOffYear
