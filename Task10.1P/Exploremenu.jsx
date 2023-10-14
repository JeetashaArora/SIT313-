import React from 'react'
import { Button, Grid, Image } from 'semantic-ui-react'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'


const GridExampleVerticallyDivided = () => (
    <>
        <div>
            <form className="form" action='/' method='post'>
            <div className="sign_up mx-3">
                <div className='input'>
                <span className='mx-3'>SIGN UP FOR THE DAILY INSIDER</span>
                <input className="mx-4  " type='email' name="email" placeholder='Enter your Email'></input>
                <Button variant="success" size='sm'>Subscribe</Button>{' '}
                </div>
            </div>
            </form>
        </div>
        <div className="container mg menu mx--1">
            <Grid divided='vertically text-justify' >
                <Grid.Row className="ui_grid " columns={3}>
                    <Grid.Column>
                        <h3>EXPLORE</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>SUPPORT</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>STAY CONNECTED</h3>
                    </Grid.Column>
                </Grid.Row>
                {/* 2nd Row */}
                <Grid.Row className="ui_grid g-4" columns={3}>
                    <Grid.Column>
                        <h5>Home</h5>
                    </Grid.Column>
                    <Grid.Column>
                        <h5>FAQ's</h5>
                    </Grid.Column>
                    <Grid.Column >
                        <div className='mx-5'>
                            <FaFacebookSquare size={"2em"}></FaFacebookSquare>
                            <FaTwitterSquare size={"2em"}></FaTwitterSquare>
                            <FaInstagramSquare size={"2em"}></FaInstagramSquare>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                {/* 3rd row */}
                <Grid.Row className="ui_grid g-4" columns={3}>
                    <Grid.Column>
                        <h5>Questions</h5>
                    </Grid.Column>
                    <Grid.Column>
                        <h5>Help</h5>
                    </Grid.Column>
                    <Grid.Column >
                        <div className='mx-5'>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                {/* 4th Row */}
                <Grid.Row className="ui_grid g-4" columns={3}>
                    <Grid.Column>
                        <h5>Articles</h5>
                    </Grid.Column>
                    <Grid.Column>
                        <h5>Contact Us</h5>
                    </Grid.Column>
                    <Grid.Column >
                        <div className='mx-5'>
                        </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row className="ui_grid g-4" columns={3}>
                    <Grid.Column>
                        <h5>Tutorials</h5>
                    </Grid.Column>
                </Grid.Row>
                <br></br>
                <h3 className='text p-2'><strong>DEV@Deakin 2022</strong></h3>
                <pre className='text2 p-3'>Privacy Policy            Terms            Code Of Conduct   </pre>
            </Grid>
        </div>
    </>
)
export default GridExampleVerticallyDivided

