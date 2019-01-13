import Home from '../../components/Home'
import Cat from '../../components/Cat'
import My from '../../components/My'
import React from 'react'
import { TabBar, Drawer, List } from 'antd-mobile'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

export default () => {
  const [select, setSelect] = useState('home')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    console.log('effect: ' + select)
  })
  const onOpenChange = () => {
    setOpen(!open)
    console.log('change')
  }
  const navArr = [
    {
      title: 'home',
      iconUri:
        'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg',
      selectedIconUri:
        'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'
    },
    {
      title: 'cat',
      iconUri:
        'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
      selectedIconUri:
        'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'
    },
    {
      title: 'my',
      iconUri:
        'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
      selectedIconUri:
        'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'
    }
  ]

  const contentComponents = {
    Home,
    Cat,
    My
  }
  const renderContent = key => {
    const name = key.toLowerCase().replace(/^\S/, s => s.toUpperCase()) //首字母大写
    const Content = contentComponents[name]
    console.log('rendeeContent: ' + name)
    return <Content onOpenChange={onOpenChange} />
  }

  return (
    <div style={{ height: '667px' }}>
      <Drawer sidebar={<Sidebar />} open={open} onOpenChange={onOpenChange}>
        <TabBar>
          {navArr.map(item => (
            <TabBar.Item
              title={item.title}
              key={item.title}
              selected={select === item.title}
              icon={{ uri: item.iconUri }}
              selectedIcon={{ uri: item.selectedIconUri }}
              onPress={() => {
                setSelect(item.title)
              }}
            >
              {renderContent(item.title)}
            </TabBar.Item>
          ))}
        </TabBar>
      </Drawer>
    </div>
  )
}
