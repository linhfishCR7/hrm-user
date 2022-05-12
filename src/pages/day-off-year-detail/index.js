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
  CFormSelect,
  CContainer,
  CFormLabel,
  CFormText,
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const { TextArea } = Input

const DayOffYearDetail = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [data, setData] = useState([])
  const [dayOffType, setDayOffTypeList] = useState([{}])
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [loading_spin, setLoadingSpin] = useState(true)
  const [from_date, setFromDate] = useState(null)
  const [to_date, setToDate] = useState(null)
  const [amount, setAmount] = useState(1)
  const [note, setNote] = useState('')
  const [day_off_types, setDayOffType] = useState('')
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

  const fetchDayOffTypeAPI = () => {
    API({ REGISTER_URL: '/user/day-off-types/?no_pagination=true' , ACTION: 'GET' })
    .then(results => {
      setDayOffTypeList(results.data)
    })
    .catch((error) => {console.log(error)})
  }

  const setOpenModalVisibleEdit = (item) =>  {
    API({ REGISTER_URL: '/user/day-off-year-details/' + item.id + '/' , ACTION: 'GET' })
    .then(results => {
      setFromDate(results.data.from_date)
      setToDate(results.data.to_date)
      setAmount(results.data.amount)
      setNote(results.data.note)
      setDayOffType(results.data.day_off_types.id)
      setId(results.data.id)

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
    const day_off_year_id = localStorage.getItem('day_off_year_id')
    setPage(newPage)
    API({
      REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id +'&page=' + (newPage + 1) + '&page_size=' + rowsPerPage,
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
    const day_off_year_id = localStorage.getItem('day_off_year_id')
    API({
      REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id + '&page=' + (page + 1) + '&page_size=' + +event.target.value,
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

  useEffect(() => {
    const day_off_year_id = localStorage.getItem('day_off_year_id')
    fetchDayOffTypeAPI()
    API({ REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id , ACTION: 'GET' })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)        
        setLoadingSpin(false)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
  }, [])

  const handleDelete = (event) => {
    event.preventDefault()
    const day_off_year_id = localStorage.getItem('day_off_year_id')

    API({ REGISTER_URL: '/user/day-off-year-details/' + id + '/', ACTION: 'DELETE' })
      .then((res) => {
        API({ REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id , ACTION: 'GET' })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
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


  const handleAddSubmit = (event) => {
    const day_off_year_id = localStorage.getItem('day_off_year_id')

    event.preventDefault()

    const newData = {
      day_off_years: day_off_year_id,
      from_date: from_date,
      to_date: to_date,
      amount: amount,
      note: note,
      day_off_types: day_off_types
    }
    API({
      REGISTER_URL: '/user/day-off-year-details/',
      ACTION: 'POST',
      DATA: newData,
    })
      .then((res) => {

    API({ REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id , ACTION: 'GET' })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)        
        setLoadingSpin(false)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
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
            description: error.response.data.message,
            placement: 'topRight',
          })
          setCloseModalVisibleAdd()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Thêm dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          setCloseModalVisibleAdd()
        }
      })
  }

  const handleEditSubmit = (event) => {
    const day_off_year_id = localStorage.getItem('day_off_year_id')

    event.preventDefault()

    const newData = {
      day_off_years: day_off_year_id,
      from_date: from_date,
      to_date: to_date,
      amount: amount,
      note: note,
      day_off_types: day_off_types
    }
    API({
      REGISTER_URL: '/user/day-off-year-details/' + id + '/',
      ACTION: 'PUT',
      DATA: newData,
    })
      .then((res) => {
        API({ REGISTER_URL: '/user/day-off-year-details/?day_off_years__id='+ day_off_year_id , ACTION: 'GET' })
      .then(results => {
        setData(results.data.results)
        setCount(results.data.count)        
        setLoadingSpin(false)
      })
      .catch(function (error) {
        console.log(error.response.data.message)
      })
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
            description: error.response.data.message,
            placement: 'topRight',
          })
          setCloseModalVisibleEdit()
        } else {
          openNotificationWithIcon({
            type: 'error',
            message: 'Cập nhật dữ liệu không thành công!!!',
            description: error,
            placement: 'topRight',
          })
          setCloseModalVisibleEdit()
        }
      })
  }

  return (
    <>
      <Loading loading={loading_spin} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='DANH SÁCH PHÉP NĂM CHI TIẾT' titleTypographyProps={{ variant: 'h6' }} />
            <Button variant='contained' sx={{ marginBottom: 7, marginLeft: 7 }} onClick={() => setOpenModalVisibleAdd()}>
            <PlusCircleOutlined /> Thêm chi tiết phép năm
            </Button>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell key='9' align='left' sx={{ minWidth: 170 }}>
                        Chức Năng
                      </TableCell>
                      <TableCell key='11' align='left' sx={{ minWidth: 170 }}>
                        Ngày Viết Đơn
                      </TableCell>
                      <TableCell key='10' align='left' sx={{ minWidth: 170 }}>
                        Từ Ngày
                      </TableCell>
                      <TableCell key='6' align='left' sx={{ minWidth: 170 }}>
                        Đến Ngày
                      </TableCell>
                      <TableCell key='5' align='left' sx={{ minWidth: 170 }}>
                        Số Lượng
                      </TableCell>
                      <TableCell key='1' align='left' sx={{ minWidth: 170 }}>
                       Ghi Chú
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
                          <TableCell align='left' key='1' sx={{ minWidth: 170 }}>
                            {item.day_off_years.date}
                          </TableCell>
                          <TableCell align='left' key='2' sx={{ minWidth: 170 }}>
                            {item.from_date}
                          </TableCell>
                          <TableCell align='left' key='3' sx={{ minWidth: 170 }}>
                            {item.to_date}
                          </TableCell>
                          <TableCell align='left' key='4' sx={{ minWidth: 170 }}>
                            {item.amount}
                          </TableCell>
                          <TableCell align='left' key='5' sx={{ minWidth: 170 }}>
                            {item.note}
                          </TableCell>
                          <TableCell align='left' key='6' sx={{ minWidth: 170 }}>
                            {item.day_off_years.reason}
                          </TableCell>
                          <TableCell align='left' key='7' sx={{ minWidth: 170 }}>
                            {item.day_off_years.contact}
                          </TableCell>
                          <TableCell align='left' key='8' sx={{ minWidth: 170 }}>
                            {item.day_off_years.hand_over}
                          </TableCell>
                          <TableCell align='left' key='9' sx={{ minWidth: 170 }}>
                            {item.day_off_years.status ? 'Đã Duyệt' : 'Không Duyệt'}
                          </TableCell>
                          <TableCell align='left' key='10' sx={{ minWidth: 170 }}>
                            {item.day_off_years.approved_by ? item.day_off_years.approved_by.user.last_name + ' ' + item.day_off_years.approved_by.user.first_name : ''}
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
          title="Xoá Chi Tiết Phép Năm"
          style={{ top: 20 }}
          visible={visible}
          onOk={handleDelete}
          onCancel={() => setCloseModalVisible(false)}
        >
          <h2 style={{ textAlign: 'center' }}>Bạn Có Chắc Chắn Xoá?</h2>
      </Modal>
      
      <Modal
        title="Thêm Chi Tiết Phép Năm"
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Từ Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Từ Ngày"
                      autoComplete="from_date"
                      name="from_date"
                      onChange={(event)=> setFromDate(event.target.value)}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nghỉ bắt đầu bắt buộc chọn
                    </CFormText>
                  </CCol>
                  <CCol>
                  <CFormLabel htmlFor="exampleFormControlInput1">Đến Ngày</CFormLabel>
                    <CFormInput
                      type="date"
                      placeholder="Đến Ngày"
                      autoComplete="to_date"
                      name="to_date"
                      onChange={(event)=> setToDate(event.target.value)}
                      required
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ngày nghỉ kết bắt buộc chọn
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng</CFormLabel>
                    <CFormInput
                      type="number"
                      placeholder="Số Lượng Ngày"
                      autoComplete="amount"
                      name="amount"
                      onChange={(event)=> setAmount(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Số lượng ngày nghỉ bắt buộc nhập
                    </CFormText>
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Loại Ngày Nghỉ</CFormLabel>
                    <CFormSelect
                      name="day_off_types"
                      aria-label="Loại Ngày Nghỉ"
                      onChange={(event)=> setDayOffType(event.target.value)}
                      required
                    >
                      <option key="0" value="">
                        Chọn Loại Ngày Nghỉ
                      </option>
                      {dayOffType.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </CFormSelect>
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Loại ngày nghỉ bắt buộc chọn
                    </CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol>
                    <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                    <TextArea
                      rows={8}
                      type="text"
                      placeholder="Ghi Chú"
                      autoComplete="note"
                      name="note"
                      onChange={(event)=> setNote(event.target.value)}
                      aria-describedby="exampleFormControlInputHelpInline"
                    />
                    <CFormText component="span" id="exampleFormControlInputHelpInline">
                      Ghi chú bắt buộc nhập
                    </CFormText>
                  </CCol>
                </CRow>
              </CContainer>
            </CForm>{' '}
      </Modal>
      <Modal
        title="Cập Nhật Chi Tiết Phép Năm"
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
                <CFormLabel htmlFor="exampleFormControlInput1">Từ Ngày</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Từ Ngày"
                  autoComplete="from_date"
                  name="from_date"
                  value={from_date}
                  onChange={(event)=> setFromDate(event.target.value)}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày nghỉ bắt đầu bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
              <CFormLabel htmlFor="exampleFormControlInput1">Đến Ngày</CFormLabel>
                <CFormInput
                  type="date"
                  placeholder="Đến Ngày"
                  autoComplete="to_date"
                  name="to_date"
                  value={to_date}
                  onChange={(event)=> setToDate(event.target.value)}
                  required
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ngày nghỉ kết bắt buộc chọn
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Số Lượng</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Số Lượng Ngày"
                  autoComplete="amount"
                  name="amount"
                  value={amount}
                  onChange={(event)=> setAmount(event.target.value)}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Số lượng ngày nghỉ bắt buộc nhập
                </CFormText>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Loại Ngày Nghỉ</CFormLabel>
                <CFormSelect
                  name="day_off_types"
                  aria-label="Loại Ngày Nghỉ"
                  value={day_off_types}
                  onChange={(event)=> setDayOffType(event.target.value)}
                  required
                >
                  <option key="0" value="">
                    Chọn Loại Ngày Nghỉ
                  </option>
                  {dayOffType.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Loại ngày nghỉ bắt buộc chọn
                </CFormText>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="exampleFormControlInput1">Ghi Chú</CFormLabel>
                <TextArea
                  rows={8}
                  type="text"
                  placeholder="Ghi Chú"
                  autoComplete="note"
                  name="note"
                  value={note}
                  onChange={(event)=> setNote(event.target.value)}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormText component="span" id="exampleFormControlInputHelpInline">
                  Ghi chú bắt buộc nhập
                </CFormText>
              </CCol>
            </CRow>
          </CContainer>
        </CForm>{' '}
      </Modal>
    </>
  )
}

export default DayOffYearDetail
