import React from 'react'
import { TabBar, List, Accordion } from 'antd-mobile'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { resolve, reject } from 'q'

export default props => {
  const [catgory, setCatgory] = useState()
  const [subCatgory, setSubCatgory] = useState()
  let total = {}
  function getCatgory() {
    return new Promise((resolve, reject) => {
      axios.get('api/xiandu/categories').then(({ data }) => {
        console.log(data)
        if (!data.error) {
          setCatgory(data.results)
          resolve(data.results)
        }
      })
    })
  }

  function getSubCatgory(key) {
    return new Promise((resolve, reject) => {
      axios.get('api/xiandu/category/' + key).then(({ data }) => {
        console.log(data)
        if (!data.error) {
          // return data.results
          total[key] = data.results
          setSubCatgory(total)
          resolve(data.results)
        }
      })
    })
  }
  useEffect(() => {
    getCatgory().then(data => {
      data.map(({ en_name }) => {
        getSubCatgory(en_name).then(() => {
          console.log('total' + JSON.stringify(total))
        })
      })
    })
  }, [])

  function onChange(key) {
    console.log(key)
    console.log(subCatgory)
  }
  return (
    <Accordion onChange={onChange}>
      {catgory &&
        catgory.map(item => (
          <Accordion.Panel header={item.name} key={item._id}>
            <List>
              {subCatgory &&
                subCatgory[item.en_name] &&
                subCatgory[item.en_name].map(subItem => (
                  <List.Item key={subItem._id}>{subItem.title}</List.Item>
                ))}
            </List>
          </Accordion.Panel>
        ))}
    </Accordion>
  )
}
