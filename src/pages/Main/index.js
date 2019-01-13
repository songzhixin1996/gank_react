import Home from '../../components/Home'
import Cat from '../../components/Cat'
import My from '../../components/My'
import React from 'react'
import { TabBar, Drawer, List } from 'antd-mobile'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'

export default () => {
  const [select, setSelect] = useState('home')
  const [open, setOpen] = useState(false)
  const [selectCat, setSelectCat] = useState('qdaily') //目录默认是qdaily，好奇心日报
  useEffect(() => {
    console.log('effect: ' + select)
  })
  function onOpenChange() {
    setOpen(!open)
    console.log('change')
  }
  const [catgory, setCatgory] = useState()
  const [subCatgory, setSubCatgory] = useState()
  let total = {}
  function getCatgory() {
    return new Promise((resolve, reject) => {
      axios.get('api/xiandu/categories').then(({ data }) => {
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
        if (!data.error) {
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
        getSubCatgory(en_name).then(() => {})
      })
    })
  }, [])
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
    return <Content onOpenChange={onOpenChange} selectCat={selectCat} />
  }

  return (
    <div style={{ height: '667px' }}>
      <Drawer
        sidebar={
          <Sidebar
            catgory={catgory}
            subCatgory={subCatgory}
            setSelectCat={setSelectCat}
          />
        }
        open={open}
        onOpenChange={onOpenChange}
      >
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
              {/* Cat */}
              {renderContent(item.title)}
            </TabBar.Item>
          ))}
        </TabBar>
      </Drawer>
    </div>
  )
}
