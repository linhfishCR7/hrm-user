import { CContainer, CForm, CFormSelect, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from 'src/utils/loading'

import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}
const { Option } = Select

const Salary = () => {
  const [data, setData] = useState({})
  const [dataListSalary, setDataListSalary] = useState([{}])
  const [dataSalary, setDataSalary] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchListSalaryAPI = () => {
    const staff_id = localStorage.getItem('staff_id')

    API({
      REGISTER_URL: '/user/salary/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET'
    })
      .then(res => {
        const data = res.data
        setDataListSalary(data)
        setLoading(false)
      })
      .catch(error => {})
  }

  const fetchSalaryAPI = dataSalary => {
    API({
      REGISTER_URL: '/user/salary/' + dataSalary + '/',
      ACTION: 'GET'
    })
      .then(res => {
        const data = res.data
        setData(data)
        setLoading(false)
      })
      .catch(error => {})
  }

  useEffect(() => {
    setLoading(true)
    fetchListSalaryAPI()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchSalaryAPI(dataSalary)
  }, [dataSalary])

  return (
    <>
      <Loading loading={loading} />
      <CContainer sx={{ marginBottom: 7 }}>
        <h2 className='mt-3 mb-4 fw-bold'>Bảng Lương Nhân Viên PDF</h2>
        <CRow className='mb-3'>
          <CCol md={8}>
            <Select
              allowClear
              showSearch
              style={{ width: 700 }}
              placeholder='Tìm kiếm theo tháng và năm'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              //   filterSort={(optionA, optionB) =>
              //     optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              //   }
              //   value={dataStaff}
              onChange={event => setDataSalary(event)}
            >
              <Option key='0' value=''>
                Chọn Bảng Lương Tháng
              </Option>
              {dataListSalary.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.month + '-' + item.year}
                </Option>
              ))}
            </Select>
          </CCol>
        </CRow>
      </CContainer>
      <br />
      <CContainer className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <embed src={data.key} type='application/pdf' height='1000px' width='100%' />
          </div>
        </div>
      </CContainer>
    </>
  )
}
export default Salary
