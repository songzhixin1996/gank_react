import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import React from 'react'
import { useState, useEffect } from 'react'

export default () => {
  const [open, setOpen] = useState(false)
  const sidebar = (
    <List>
      <List.Item>
        <p>1</p>
      </List.Item>
      <List.Item>
        <p>2</p>
      </List.Item>
    </List>
  )

  const onOpenChange = () => {
    setOpen(!open)
  }
  return (
    <>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>
        Basic
      </NavBar>
      <Drawer sidebar={sidebar} open={open}>
        content
      </Drawer>
    </>
  )
}
