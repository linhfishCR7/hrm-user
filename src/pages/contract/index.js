import { CContainer, CRow, CCol } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select, Divider} from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from 'src/utils/loading'
import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

const { Option } = Select

const Contract = () => {
  const [data, setData] = useState({})
  const [datalistcontract, setDataListContract] = useState([{}])
  const [datacontract, setDataContract] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchListContractAPI = () => {
    const staff_id = localStorage.getItem('staff_id')
    API({
      REGISTER_URL: '/user/employment-contract/list-employment-contract/?no_pagination=true&staff__id=' + staff_id,
      ACTION: 'GET'
    })
      .then(res => {
        const data = res.data
        setDataListContract(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }

  const fetchContractAPI = datacontract => {
    const staff_id = localStorage.getItem('staff_id')
    API({
      REGISTER_URL:
        '/user/employment-contract/list-employment-contract/?no_pagination=true&staff__id=' +
        staff_id +
        '&id=' +
        datacontract,
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
    fetchListContractAPI()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchContractAPI(datacontract)
  }, [datacontract])

  return (
    <>
      <Loading loading={loading} />
      <h2 sx={{ marginBottom: 7 }}>Hợp Đồng Lao Động Nhân Viên PDF</h2>

      <CContainer sx={{ marginBottom: 7 }}>
        <CRow>
          <CCol md={8}>
            <Select
              showSearch
              style={{ width: 700 }}
              placeholder='Tìm kiếm tên hợp đồng'
              optionFilterProp='children'
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={event => setDataContract(event)}
            >
              <Option key='0' value=''>
                Chọn Hợp Đồng
              </Option>
              {datalistcontract.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
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

export default Contract
