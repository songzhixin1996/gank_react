import { List, NavBar, Icon } from 'antd-mobile'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default props => {
  const onOpenChange = props.onOpenChange
  let selectCat = props.selectCat
  console.log('select:' + selectCat)
  const [contentList, setContentList] = useState()
  function getContentList() {
    axios
      .get(`api/xiandu/data/id/${selectCat}/count/10/page/1 `)
      .then(({ data }) => {
        // console.log(data)
        if (!data.error) {
          console.log(data.results)
          setContentList(data.results)
        }
      })
  }
  useEffect(
    () => {
      getContentList()
    },
    [selectCat]
  )
  return (
    <>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>
        Basic
      </NavBar>
      <div>
        <List>
          {contentList &&
            contentList.map(item => (
              <List.Item key={item._id}>{item.title}</List.Item>
            ))}
        </List>
      </div>
    </>
  )
}
