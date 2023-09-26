
import { Button, Container, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'




export default function Navbar() {




  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item as= {NavLink} to='/' header> 
                <img src= "/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                reactivities
            </Menu.Item>
            <Menu.Item as= {NavLink} to='/Activities'  name='Activities'/>
            <Menu.Item>
                    <Button as={NavLink} to = '/createActivity' positive content='Create activity'/>

            </Menu.Item>
        </Container>
    </Menu>
  )
}
