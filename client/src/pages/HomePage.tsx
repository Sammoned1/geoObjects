import React, { FC } from 'react'
import OlMap from '../components/OlMap'
import SideBar from '../components/SideBar/SideBar'

const HomePage: FC = () => {
  return (
    <div style={{display: 'flex', gap: 3}}>
      <SideBar />
      <OlMap />
    </div>
  )
}

export default HomePage