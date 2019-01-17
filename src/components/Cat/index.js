import { List, NavBar, Icon } from 'antd-mobile'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import ContentDetail from '../ContentDetail'

axios.defaults.baseURL = 'https://gank.io'

export default props => {
  const onOpenChange = props.onOpenChange
  let selectCat = props.selectCat
  console.log('select:' + selectCat)
  const [contentList, setContentList] = useState()

  /**
   * 获取分类的列表，包括内容
   */
  function getContentList() {
    axios
      .get(`api/xiandu/data/id/${selectCat}/count/10/page/1 `)
      .then(({ data }) => {
        if (!data.error) {
          console.log(data.results)
          setContentList(data.results)
        }
      })
  }

  function ContentList() {
    return (
      <>
        <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>
          Basic
        </NavBar>
        <div>
          <List>
            {contentList &&
              contentList.map(item => (
                <Link
                  key={item._id}
                  to={{
                    pathname: `/content/${item._id}`,
                    state: contentList[0]
                  }}
                >
                  <List.Item>{item.title}</List.Item>
                </Link>
              ))}
          </List>
        </div>
      </>
    )
  }

  useEffect(
    () => {
      getContentList()
    },
    [selectCat]
  )
  return (
    <>
      <Route path="/" exact component={ContentList} />
      <Route path="/content/:id" component={ContentDetail} />
    </>
  )
}
