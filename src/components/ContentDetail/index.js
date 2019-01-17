import React from 'react'

export default props => {
  let raw = props.location.state.raw
  let newa = raw.replace(/'/g, '"')
  console.log(newa)
  raw = JSON.parse(newa)
  // console.log(newa)
  let content = props.location.state.raw
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
