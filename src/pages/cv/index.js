import { CContainer } from '@coreui/react'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Select } from 'antd'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import Loading from 'src/utils/loading'

import API from 'src/utils/apiCaller' //REGISTER_URL, ACTION, DATA = {}

const CV = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchStaffAPI = () => {
    const staff_id = localStorage.getItem('staff_id')

    API({
      REGISTER_URL: '/user/staffs/' + staff_id + '/',
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
    fetchStaffAPI()
  }, [])

  return (
    <>
      <Loading loading={loading} />
      <CContainer className='content'>
        <div className='row'>
          <div className='col-sm-12'>
            <h2 className='mt-3 mb-4 fw-bold'>CV Nhân Viên PDF</h2>
            <embed src={data.key} type='application/pdf' height='1000px' width='100%' />
          </div>
        </div>
      </CContainer>
    </>
  )
}

export default CV
