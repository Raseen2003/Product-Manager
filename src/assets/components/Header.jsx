import React from 'react'
import { Navbar,Container } from 'react-bootstrap'

import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <>
       <Navbar style={{zIndex:1}} className="shadow border rounded postion-fixed">
        <Container>
          <Navbar.Brand>
            <Link className=' text-decoration-none fw-bolder' to={'/'}><i className='fa-brands fa-docker text-decoration-none'></i>PRODUCT MANAGER</Link>
          </Navbar.Brand>
      
        
        <button className="btn btn-link fw-bolder">Logout <i className='fa-solid fa-right-from-bracket ms-1'></i>  </button>
      
      
        </Container>
      </Navbar>
    </>
  )
}

export default Header
