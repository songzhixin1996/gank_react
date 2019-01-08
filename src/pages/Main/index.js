import Home from '../../components/Home'
import Cat from '../../components/Cat'
import My from '../../components/My'
import React from 'react'
import { TabBar } from 'antd-mobile'
import { useState, useEffect } from 'react'

export default () => {
  const [select, setSelect] = useState('home')
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
    return <Content />
  }

  return (
    <div style={{ height: '667px' }}>
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
    </div>
  )
}
