import { CContainer, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select, Divider} from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from 'src/utils/loading'
import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

const { Option } = Select

const DayOffYearReport = () => {
  const [data, setData] = useState({})
  const [datalistday, setDataListDay] = useState([{}])
  const [dataday, setDataDay] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchListDayAPI = () => {
    const staff_id = localStorage.getItem('staff_id')
    API({
      REGISTER_URL: '/user/day-off-years/list-day-off-year/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET'
    })
      .then(res => {
        const data = res.data
        setDataListDay(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }

  const fetchDayAPI = dataday => {
    const staff_id = localStorage.getItem('staff_id')
    API({
      REGISTER_URL:
        '/user/day-off-years/list-day-off-year/?no_pagination=true&staff__id=' +
        staff_id +
        '&id=' +
        dataday,
      ACTION: 'GET'
    })
      .then(res => {
        const data = res.data
        setData(data[0].key)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    fetchListDayAPI()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchDayAPI(dataday)
  }, [dataday])

  return (
    <>
      <Loading loading={loading} />
      <h2 sx={{ marginBottom: 7 }}>Phiếu Xin Nghỉ Phép Nhân Viên PDF</h2>

      <CContainer sx={{ marginBottom: 7 }}>
        <CRow>
          <CCol md={8}>
            <Select
              showSearch
              style={{ width: 700 }}
              placeholder='Tìm kiếm ngày xin nghỉ'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={event => setDataDay(event)}
            >
              <Option key='0' value=''>
                Chọn Ngày Xin Nghỉ Phép
              </Option>
              {datalistday.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.date}
                </Option>
              ))}
            </Select>
          </CCol>
        </CRow>
      </CContainer>
      <Divider />

      <CContainer className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <embed src={data} type='application/pdf' height='1000px' width='100%' />
          </div>
        </div>
      </CContainer>
    </>
  )
}

export default DayOffYearReport
