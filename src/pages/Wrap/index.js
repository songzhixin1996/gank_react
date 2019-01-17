import { Route } from 'react-router-dom'
import React from 'react'
import Main from '../Main'

export default () => {
  return (
    <>
      <Route path="/" exact component={Main} />
    </>
  )
}
