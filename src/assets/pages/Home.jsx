import React from 'react'
import Header from '../components/Header'
import Add from '../components/Add'
import View from '../components/View'




const Home = () => {
  return (
    <>
        <Header />
      <div className='d-flex justify-content-between align-items-center'>
          <h1 className='ms-4 mt-4 text-primary '>ALL PRODUCTS</h1>
          <div className='me-4'><Add/></div>
      </div>
      <View
        />

    </>
  )
}

export default Home
