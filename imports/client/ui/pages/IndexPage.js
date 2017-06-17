import React from 'react'

import MainLayout from '../views/MainLayout'
import NavCard from '../views/NavCard'
import NavCardsLayout from '../views/NavCardsLayout'

export default function IndexPage (props) {
  return <MainLayout>
    <NavCardsLayout>
      <NavCard>我</NavCard>
      <NavCard>活动</NavCard>
      <NavCard>人员</NavCard>
      <NavCard>球队</NavCard>
      <NavCard>球场</NavCard>
      <NavCard>球赛</NavCard>
    </NavCardsLayout>
  </MainLayout>
}