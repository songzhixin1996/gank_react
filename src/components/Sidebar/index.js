import React from 'react'
import { TabBar, List, Accordion } from 'antd-mobile'
import { useState, useEffect } from 'react'

export default props => {
  let catgory = props.catgory
  let subCatgory = props.subCatgory
  let setSelectCat = props.setSelectCat

  function onChange(key) {
    // console.log(key)
    // console.log(subCatgory)
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
                  <List.Item
                    key={subItem._id}
                    onClick={() => {
                      // console.log(subItem.id)
                      setSelectCat(subItem.id)
                    }}
                  >
                    {subItem.title}
                  </List.Item>
                ))}
            </List>
          </Accordion.Panel>
        ))}
    </Accordion>
  )
}
