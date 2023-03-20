import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField, Box, Typography, Tabs, Tab, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router-dom'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Login({ authErrors, setAuthErrors }) {

    console.log(authErrors)

    useEffect(() => {
        checkSignupParam()
    }, [])

    const { setUser, isAuth, setIsAuth } = useContext(UserContext)
    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const [signupFormData, setSignupFormData] = useState({
        username: '',
        password: '',
        password_confirmation: '',
        bio: ''
    });
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState([])

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setErrors([])
        if (authErrors) {
            setAuthErrors([])
        }
        setLoginFormData({
            username: '',
            password: ''
        })
        setSignupFormData({
            username: '',
            password: '',
            password_confirmation: '',
            bio: ''
        })
    };

    function handleSignUpFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setErrors([])
        if (authErrors) {
            setAuthErrors([])
        }
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
    }

    function handleLoginFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setErrors([])
        if (authErrors) {
            setAuthErrors([])
        }
        setLoginFormData({
          ...loginFormData,
          [name]: value,
        });
    }

      function handleSignupSubmit(e) {
        e.preventDefault()
        fetch(`/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupFormData)
        })
        // .then(r => r.json())
        // .then(data => {
        //     console.log(data)
        //     setSignupFormData({
        //         username: '',
        //         password: '',
        //         bio: ''
        //     })
        //     setUser(data)
        //     setIsAuth(true)
        //     navigate('/adventures')
        // })
        .then(r => {
            r.ok ? r.json().then(data => {
                setSignupFormData({
                    username: '',
                    password: '',
                    password_confirmation: '',
                    bio: ''
                })
                setUser(data)
                console.log(isAuth)
                setIsAuth(true)
                console.log(isAuth)
                navigate('/adventures')
            })
            : r.json().then(errors => {
                console.log(errors.errors)
                setErrors(errors.errors)
                // setSignupFormData({
                //     username: '',
                //     password: '',
                //     bio: ''
                // })
            })
        })
      }

      function handleLoginSubmit(e) {
        e.preventDefault()
        fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormData)
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                setLoginFormData({
                    username: '',
                    password: ''
                })
                setUser(data)
                console.log(isAuth)
                setIsAuth(true)
                console.log(isAuth)
                navigate('/adventures')
            })
            : r.json().then(errors => {
                console.log(errors.errors)
                setErrors(errors.errors)
                // setLoginFormData({
                //     username: '',
                //     password: ''
                // })
            })
        })
      }

        const urlParams = new URL(window.location.href).searchParams;
        const signup = urlParams.get('signup');
        const checkSignupParam = () => {
            if (signup) {
                setValue(1)
            } else return
        }

    //   function handleLoginSubmit(e) {
    //     e.preventDefault()
    //     fetch(`/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(loginFormData)
    //     })
    //     .then(r => r.json())
    //     .then(data => {
    //         console.log(data)
    //         setUser(data)
    //         navigate('/account')
    //     })
    //   }

    return (
        <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ 
                display: { xs: 'flex', md: 'flex' },
                marginBottom: '30px'
            }}>
                <img alt="Purrfect Adventures Logo" src={require('../media/purrfect-adventures-logo.png').default} style={{ marginRight: 'auto', maxWidth: '100%' }} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '400px', width: '90%' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Signup" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} style={{ maxWidth: '400px', width: '90%' }}>
            <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleLoginSubmit}
                    >
                        {authErrors ? authErrors.map(error => <Alert key={error} severity="error" sx={{ width: '92%!important', padding: '0 16px' }}>{error}</Alert>) : null}
                        {errors ? errors.map(error => <Alert key={error} severity="error" sx={{ width: '92%!important', padding: '0 16px' }}>{error}</Alert>) : null}
                        <TextField
                            id="outlined-username"
                            label="Username"
                            name="username"
                            value={loginFormData.username}
                            onChange={handleLoginFormChange}
                            type="text"
                            size='small'
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            name="password"
                            value={loginFormData.password}
                            type="password"
                            onChange={handleLoginFormChange}
                            size='small'
                        />
                        <Button variant="contained" type='submit'>Submit</Button>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ maxWidth: '400px', width: '90%' }}>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSignupSubmit}
                        >
                        {errors ? errors.map(error => <Alert key={error} severity="error" sx={{ width: '92%!important', padding: '0 16px' }}>{error}</Alert>) : null}
                        <TextField
                            id="outlined-username"
                            label="Username"
                            name="username"
                            value={signupFormData.username}
                            onChange={handleSignUpFormChange}
                            type="text"
                            size='small'
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            name="password"
                            value={signupFormData.password}
                            type="password"
                            onChange={handleSignUpFormChange}
                            size='small'
                        />
                        <TextField
                            id="outlined-password-confirmation"
                            label="Confirm Password"
                            name="password_confirmation"
                            value={signupFormData.password_confirmation}
                            type="password"
                            onChange={handleSignUpFormChange}
                            size='small'
                        />
                        <TextField
                            id="outlined-bio"
                            label="Bio"
                            name="bio"
                            value={signupFormData.bio}
                            type="text"
                            onChange={handleSignUpFormChange}
                            multiline
                            rows={3}
                            size='small'
                        />
                        <Button variant="contained" type='submit'>Submit</Button>
                    </Box>
                </Box>
            </TabPanel>
        </Box>
        // <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //     <Box
        //         component="form"
        //         sx={{
        //             '& > :not(style)': { m: 1, maxWidth: '400px', width: '90%' },
        //             display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        //         }}
        //         noValidate
        //         autoComplete="off"
        //         onSubmit={handleSubmit}
        //         >
        //         <Typography variant='h1' component='h1'>
        //             Login
        //         </Typography>
        //         <TextField
        //             id="outlined-name"
        //             label="Name"
        //             name="name"
        //             value={formData.name}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-address"
        //             label="Full Address"
        //             name="address"
        //             value={formData.address}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-phone"
        //             label="Phone Number"
        //             name="phone"
        //             value={formData.phone}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-email"
        //             label="Email"
        //             name="email"
        //             value={formData.email}
        //             onChange={handleChange}
        //             type="email"
        //         />
        //         <TextField
        //             id="outlined-password"
        //             label="Password"
        //             name="password"
        //             value={formData.password}
        //             type="password"
        //             onChange={handleChange}
        //         />
        //         <Button variant="contained" type='submit'>Submit</Button>
        //     </Box>
        // </Box>
    )
}

export default Login