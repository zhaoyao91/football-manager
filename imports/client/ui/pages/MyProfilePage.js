import React from 'react'
import { Container } from 'reactstrap'

import MainLayout from '../views/MainLayout'
import UserCenterNavs from '../views/UserCenterNavs'
import PaddingContainer from '../components/PaddingContainer'

export default function MyProfilePage (props) {
  return <MainLayout>
    <PaddingContainer>
      <h1>个人中心</h1>
      <UserCenterNavs/>
      my profile
    </PaddingContainer>
  </MainLayout>
}