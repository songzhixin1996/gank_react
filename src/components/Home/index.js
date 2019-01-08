import React from 'react'
import { useState, useEffect } from 'react'
import { Tabs, List, Card } from 'antd-mobile'
import axios from 'axios'
import CardFooter from 'antd-mobile/lib/card/CardFooter'

export default () => {
  const [tabs, setTabs] = useState()
  const [data, setData] = useState(0)
  const [allData, setAllData] = useState()
  useEffect(() => {
    console.log('render:home1 ')
    getTodayData()
  }, [])
  useEffect(() => {
    console.log('render:home ')
  })
  const getTodayData = () => {
    axios.get('api/today').then(({ data }) => {
      console.log(data)
      setAllData(data)
      setData(data.results)
      setTabs(data.category.map(item => ({ title: item })))
    })
  }

  return (
    <List>
      <Tabs tabs={tabs} destroyInactiveTab>
        {allData &&
          allData.category.map(key => (
            // <List key={key}>
            <React.Fragment key={key}>
              {data &&
                data[key].map(item => (
                  <List.Item
                    // thumb={item.images && item.images[0]}
                    onClick={() => {
                      window.location.href = item.url
                    }}
                    key={item['_id']}
                  >
                    {/* {item.desc} */}
                    <Card>
                      <Card.Header
                        title={item.who}
                        // thumb={item.images && item.images[0]}
                      />
                      <Card.Body>
                        <p>{item.desc}</p>
                      </Card.Body>
                      <Card.Footer
                        content={item.source}
                        extra={item.publishedAt}
                      />
                    </Card>
                  </List.Item>
                ))}
            </React.Fragment>
          ))}
      </Tabs>
    </List>
  )
}
