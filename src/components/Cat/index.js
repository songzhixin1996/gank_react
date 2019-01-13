import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import React from 'react'
import { useState, useEffect } from 'react'

export default props => {
  const onOpenChange = props.onOpenChange
  return (
    <>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={onOpenChange}>
        Basic
      </NavBar>
    </>
  )
}
