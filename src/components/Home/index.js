import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs, List } from 'antd-mobile'
import axios from 'axios'

export default () => {
  const [tabs, setTabs] = useState()
  const [data, setData] = useState(0)
  const [allData, setAllData] = useState()
  useEffect(() => {
    console.log('render:home ')
    getTodayData()
  }, [])
  const getTodayData = () => {
    axios.get('api/today').then(({ data }) => {
      console.log(data)
      setAllData(data)
      setData(data.results)
      setTabs(data.category.map(item => ({ title: item })))
    })
  }

  return (
    <Tabs tabs={tabs}>
      {allData &&
        allData.category.map(key => (
          <div key={key}>
            {
              <List>
                {data &&
                  data[key].map(item => (
                    <List.Item
                      thumb={item.images && item.images[0]}
                      arrow="horizontal"
                      onClick={() => {
                        window.location.href = item.url
                      }}
                    >
                      {item.desc}
                    </List.Item>
                  ))}
              </List>
            }
          </div>
        ))}
    </Tabs>
  )
}
