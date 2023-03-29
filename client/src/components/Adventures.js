import React, { useEffect, useState, useContext } from 'react'
import { Box, Grid, Typography, Container, Button, Checkbox, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Stack, Alert, Divider } from '@mui/material'
import AdventureItem from './AdventureItem';
import { UserContext } from '../context/user';
import { DatePicker } from '@mui/x-date-pickers';
import Nav from './Nav';

function Adventures() {



    const [cats, setCats] = useState([])
    const [editAdventureObject, setEditAdventureObject] = useState([])
    const [adventureFormData, setAdventureFormData] = useState({
        title: '',
        description: '',
        location: '',
    });
    const [selectedCat, setSelectedCat] = React.useState('');
    const [catFormData, setCatFormData] = React.useState({});
    const [newCatChecked, setNewCatChecked] = React.useState(false);
    const [birthdate, setBirthdate] = React.useState(null);
    const [errors, setErrors] = useState([])

    const handleNewCatCheckedChange = (event) => {
        setNewCatChecked(event.target.checked);
        setErrors([])
        setSelectedCat('')
        setBirthdate(null)
        setCatFormData({
            name: '',
            breed: '',
            favorite_toy: '',
            birthdate: ''
        })
      };

    const handleCatSelectChange = (event) => {
        setCatFormData(() => {
            return cats.find(cat => cat.id === event.target.value)
        });
        setSelectedCat(event.target.value)
        setErrors([])
    };

    function handleAdventureFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setErrors([])
        
        setAdventureFormData({
          ...adventureFormData,
          [name]: value,
        });
    }

    function handleNewCatFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setErrors([])

        setCatFormData({
          ...catFormData,
          [name]: value,
        });
    }

    function handleSaveAdventureEdit(e) {
        e.preventDefault()
        if (catFormData.id) {
            fetch(`/adventures/${editAdventureObject.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...editAdventureObject,
                    user_id: user.id,
                    cat_id: catFormData.id,
                    title: adventureFormData.title,
                    description: adventureFormData.description,
                    location: adventureFormData.location
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json().then(data => {
                    setEditAdventureObject([])
                    setAdventures([data, ...adventures.filter(adventure => editAdventureObject.id !== adventure.id)])
                    setAdventureFormData({
                        title: '',
                        description: '',
                        location: '',
                    })
                    setUser({...user, adventures: [...user.adventures.map(adventure => {
                        if (adventure.id === data.id) {
                            return {...adventure, cat_id: data.cat_id, cat: cats.find(cat => cat.id === data.cat_id)}
                        } else {
                            return adventure
                        }
                    })]})
                    // setUser({...user, cats: [...user.cats.map((cat) => {
                    //     if (cat.id === data.cat_id) {
                    //         return cat
                    //     } else {
                    //         return cats.find(cat => cat.id === data.cat_id)
                    //     }
                    //     // if (cat.id !== data.cat_id) {
                    //     //     return cats.find(cat => cat.id === data.cat_id)
                    //     // } else {
                    //     //     return cat
                    //     // }
                    // })]})
                    setCatFormData({})
                    setSelectedCat('')
                    setNewCatChecked(false)
                    document.getElementById(`${editAdventureObject.id}`).scrollIntoView({ behavior: "smooth" });
                })
                } else {
                    return r.json().then(errors => {
                        setErrors(errors.errors)
                    })
                }
            })
        } else if ( !selectedCat && !newCatChecked) {
            setErrors(['Please choose or create a cat'])
        } else {
            fetch(`/cats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: catFormData.name,
                    breed: catFormData.breed,
                    birthdate: catFormData.birthdate,
                    favorite_toy: catFormData.favorite_toy
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json().then(cat => {
                        fetch(`/adventures/${editAdventureObject.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                ...editAdventureObject,
                                cat_id: cat.id,
                                title: adventureFormData.title,
                                description: adventureFormData.description,
                                location: adventureFormData.location
                            })
                        })
                        .then(r => {
                            if (r.ok) {
                                return r.json()
                                .then(data => {
                                    setEditAdventureObject([])
                                    setCats([...cats, cat])
                                    setAdventures([data, ...adventures.filter(adventure => editAdventureObject.id !== adventure.id)])
                                    setAdventureFormData({
                                        title: '',
                                        description: '',
                                        location: '',
                                    })
                                    setCatFormData({})
                                    setSelectedCat('')
                                    setNewCatChecked(false)
                                    document.getElementById(`${editAdventureObject.id}`).scrollIntoView({ behavior: "smooth" });
                                })
                            } else {
                                return r.json().then(errors => {
                                    setErrors(errors.errors)
                                })
                            }
                        })
                    })
                } else {
                    return r.json().then(errors => {
                        setErrors(errors.errors)
                    })
                }
            })
        }
        
      }

    function handleAdventureSubmit(e) {
        e.preventDefault()
        if (catFormData.id) {
            fetch(`/adventures`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user.id,
                    cat_id: catFormData.id,
                    title: adventureFormData.title,
                    description: adventureFormData.description,
                    location: adventureFormData.location
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json().then(data => {
                        setAdventures([data, ...adventures])
                        setUser({...user, cats: [...user.cats.filter(cat => cat.id !== data.cat_id), data.cat].sort((a,b) => a.id - b.id)})
                        setErrors([])
                        setAdventureFormData({
                            title: '',
                            description: '',
                            location: '',
                        })
                        setCatFormData({})
                        setSelectedCat('')
                        setNewCatChecked(false)
                        document.getElementById(`${data.id}`).scrollIntoView({ behavior: "smooth" });
                    })
                } else {
                    return r.json().then(errors => {
                        setErrors(errors.errors)
                    })
                }
            })
            
        } else if ( !selectedCat && !newCatChecked) {
            setErrors(['Please choose or create a cat'])
        } else {
            fetch(`/cats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: catFormData.name,
                    breed: catFormData.breed,
                    birthdate: catFormData.birthdate,
                    favorite_toy: catFormData.favorite_toy
                })
            })
            .then(r => {
                if (r.ok) {
                    return r.json().then(cat => {
                        fetch(`/adventures`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                user_id: user.id,
                                cat_id: cat.id,
                                title: adventureFormData.title,
                                description: adventureFormData.description,
                                location: adventureFormData.location
                            })
                        })
                        .then(r => {
                            if (r.ok) {
                                return r.json().then(data => {
                                    setErrors([])
                                    setUser({...user, cats: [...user.cats, cat], adventures: [data, ...user.adventures]})
                                    setCats([...cats, cat])
                                    setAdventures([data, ...adventures])
                                    setAdventureFormData({
                                        title: '',
                                        description: '',
                                        location: '',
                                    })
                                    setCatFormData({
                                        name: '',
                                        breed: '',
                                        birthdate: '',
                                        favorite_toy: '',
                                    })
                                    setSelectedCat('')
                                    setNewCatChecked(false)
                                    document.getElementById(`${data.id}`).scrollIntoView({ behavior: "smooth" });
                                })
                            } else {
                                return r.json().then(errors => {
                                    setErrors(errors.errors)
                                })
                            }
                        })
                        
                    })
                } else {
                    return r.json().then(errors => {
                        setErrors(errors.errors)
                    })
                }
            })
        }
        
      }

      useEffect(() => {
        fetch('/cats')
        .then(r => {
            if (r.ok) {
                return r.json().then(data => {
                    setCats(data)
                })
            } else {
                return r.json().then(error => console.log(error))
            }
        })
      }, [])

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
            },
        };




    const [adventures, setAdventures] = useState([])
    // const [mostLiked, setMostLiked] = useState({})
    const [featured, setFeatured] = useState([])

    const { setUser, user } = useContext(UserContext)

    useEffect(() => {
        fetch('/adventures')
        .then(r => {
            if (r.ok) {
                return r.json().then(data => {
                    setAdventures(data)
                    // setMostLiked(data.reduce(function(prev, current) {
                    //     return (prev.total_likes > current.total_likes) ? prev : current
                    // }))
                })
            } else {
                return r.json().then(error => console.log(error))
            }
        })
    }, [])

    useEffect(() => {
        fetch('/randomcat')
        .then(r => {
            if (r.ok) {
                return r.json().then(cat => setFeatured(cat))
            }
        })
    }, [])

    const getAge = (dateInput) => {
        let today = new Date();
        let birthDate = new Date(dateInput);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleCancelEditOnClick = () => {
        setErrors([])
        setEditAdventureObject([])
        setAdventureFormData({
            title: '',
            description: '',
            location: '',
        })
        setCatFormData({
            name: '',
            breed: '',
            birthdate: '',
            favorite_toy: '',
        })
        setSelectedCat('')
        setNewCatChecked(false)
        document.getElementById(`${editAdventureObject.id}`).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
        <Nav />
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={8} sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
                        {/* <Button href='/create/adventure' variant='contained' sx={{ borderRadius: '0', padding: '10px 20px', width: 'fit-content', backgroundColor: 'black', boxShadow: 'unset' }}>Post Adventure +</Button> */}
                        <Box id='adventure-form' sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={editAdventureObject.length < 1 ? handleAdventureSubmit : handleSaveAdventureEdit}
                        >
                        <Typography align='left' variant='h1' component='h1' sx={{ fontSize: '24px', margin: '8px 0!important' }}>
                            Share Your Cat's Adventure
                        </Typography>
                        <Box sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#ffffff', margin: '14px 0 0!important', padding: '10px', boxSizing: 'border-box', border: '1px solid #dddddd', boxShadow: '0px 0px 15px rgba(0 0 0 / 10%)'
                        }}>
                        {errors ? errors.map(error => <Alert key={error} severity="error" sx={{ width: '100%!important', padding: '0 16px', margin: '0px 0 8px!important', boxSizing: 'border-box' }}>{error}</Alert>) : null}
                        <Typography align='left' variant='h2' component='h2' sx={{ fontSize: '20px', margin: '8px 0 0!important' }}>
                            Cat Info
                        </Typography>
                        <FormControlLabel sx={{ margin: '8px 0 0!important' }} checked={newCatChecked} onChange={handleNewCatCheckedChange} value control={<Checkbox />} label="Create New Cat?" />
                        {!newCatChecked ? <FormControl size='small' fullWidth sx={{ margin: '8px 0!important', textAlign: 'left' }}>
                            <InputLabel id="demo-simple-select-label">Select Your Cat</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCat}
                                label="Select Your Cat"
                                onChange={handleCatSelectChange}
                                MenuProps={MenuProps}
                            >
                                {cats.map(cat => {
                                    return <MenuItem sx={{ fontSize: '12px' }} key={cat.id} value={cat.id}>{`${cat.name} | ${cat.breed} | ${getAge(cat.birthdate)} ${getAge(cat.birthdate) < 2 ? 'year' : 'years'} old`}</MenuItem>
                                })}
                            </Select>
                        </FormControl> : null}
                        {newCatChecked ? <>
                        {/* <Typography align='left' variant='h1' component='h1' sx={{ fontSize: '24px', margin: '8px 0!important' }}>
                            New Cat
                        </Typography> */}
                        <TextField
                            id="outlined-title"
                            label="Name"
                            name="name"
                            value={catFormData.name}
                            onChange={handleNewCatFormChange}
                            type="text"
                            sx={{ margin: '8px 0!important' }}
                            size='small'
                        />
                        <TextField
                            id="outlined-breed"
                            label="Breed"
                            name="breed"
                            value={catFormData.breed}
                            onChange={handleNewCatFormChange}
                            type="text"
                            sx={{ margin: '8px 0!important', borderRadius: 'unset!important' }}
                            size='small'
                        />
                        <DatePicker
                            label="Birthdate"
                            value={birthdate}
                            name="birthdate"
                            disableFuture
                            onChange={(date) => {
                            setBirthdate(date);
                            setCatFormData({...catFormData, birthdate: date})
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ margin: '8px 0!important' }}
                            size='small'
                        />
                        <TextField
                            id="outlined-favorite-toy"
                            label="Favorite Toy"
                            name="favorite_toy"
                            value={catFormData.favorite_toy}
                            onChange={handleNewCatFormChange}
                            type="text"
                            sx={{ margin: '8px 0!important', borderRadius: 'unset!important' }}
                            size='small'
                        /></> : null}
                        <Divider sx={{ margin: '15px 0 10px!important' }}></Divider>
                        <Typography align='left' variant='h2' component='h2' sx={{ fontSize: '20px', margin: '8px 0!important' }}>
                            Adventure Info
                        </Typography>
                        <TextField
                            id="outlined-title"
                            label="Title"
                            name="title"
                            value={adventureFormData.title}
                            onChange={handleAdventureFormChange}
                            type="text"
                            sx={{ margin: '8px 0!important' }}
                            size='small'
                        />
                        <TextField
                            id="outlined-description"
                            label="Description"
                            name="description"
                            value={adventureFormData.description}
                            onChange={handleAdventureFormChange}
                            type="text"
                            multiline
                            rows={2}
                            sx={{ margin: '8px 0!important', borderRadius: 'unset!important' }}
                            size='small'
                        />
                        <TextField
                            id="outlined-location"
                            label="Location - City/State"
                            name="location"
                            value={adventureFormData.location}
                            onChange={handleAdventureFormChange}
                            type="text"
                            sx={{ margin: '8px 0!important', borderRadius: 'unset!important' }}
                            size='small'
                        />
                        {editAdventureObject.length < 1 ? <Button sx={{ width: 'fit-content!important', margin: '8px 0!important', boxShadow: 'unset', borderRadius: 'unset!important' }} variant="contained" type='submit'>Submit</Button> : <Stack spacing={2} direction="row" sx={{ margin: '8px 0!important' }}>
                    <Button sx={{ borderRadius: 'unset' }} variant='contained' type='submit'>
                        Save
                    </Button>
                    <Button variant='text' onClick={handleCancelEditOnClick}>
                        Cancel
                    </Button>
                </Stack>}
                        </Box>
                    </Box>
            </Box>
            <Typography align='left' sx={{ marginTop: '40px' }}>Purrfect Adventures</Typography>
                        {adventures.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).map(adventure => {
                            return (
                                <AdventureItem key={adventure.id} id={adventure.id} adventure={adventure} user={user} setAdventureFormData={setAdventureFormData} setSelectedCat={setSelectedCat} setEditAdventureObject={setEditAdventureObject} setCatFormData={setCatFormData} cats={cats} setCats={setCats} setAdventures={setAdventures} adventures={adventures} />
                            )
                        })}
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column' }}>
                        {/* <Typography align='left' sx={{ marginTop: '20px' }}>Most Liked</Typography>
                        <Box sx={{ backgroundColor: '#f8f8f8', marginTop: '20px', padding: '20px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Box>
                                    <img alt="Cat With Heart Eyes" src={require('../media/cat-heart-eyes.png').default} style={{ marginRight: 'auto', maxWidth: '100px' }} />
                                </Box>
                                <Box sx={{ marginLeft: '30px' }}>
                                    <Typography variant='h4' component='h4' align='left' fontWeight='bold' sx={{ color: '#dc242d' }}>{mostLiked.total_likes}</Typography>
                                    <Typography align='left'>Likes</Typography>
                                </Box>
                            </Box>
                            <Typography align='left' component='h2' sx={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>{mostLiked.title}</Typography>
                            <Typography align='left' sx={{ fontSize: '16px', marginTop: '10px' }}>{mostLiked.description}</Typography>
                        </Box> */}
                        {featured ? <Box>
                            <Typography align='left' sx={{ marginTop: '20px' }}>Featured Feline</Typography>
                            <Box sx={{ backgroundColor: '#f8f8f8', marginTop: '20px', padding: '20px 20px 40px 20px', position: 'relative' }}>
                                {/* <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                    <Box>
                                        <img alt="Cat With Heart Eyes" src={require('../media/cat-heart-eyes.png').default} style={{ marginRight: 'auto', maxWidth: '100px' }} />
                                    </Box>
                                    <Box sx={{ marginLeft: '30px' }}>
                                        <Typography variant='h4' component='h4' align='left' fontWeight='bold' sx={{ color: '#dc242d' }}>{mostLiked.total_likes}</Typography>
                                        <Typography align='left'>Likes</Typography>
                                    </Box>
                                </Box> */}
                                <Typography align='left' component='h2' sx={{ fontSize: '28px', fontWeight: 'bold' }}>{featured.name}</Typography>
                                <Typography align='left' sx={{ fontSize: '12px', marginTop: '10px' }}>Age and Breed</Typography>
                                <Typography align='left' sx={{ fontSize: '16px', marginTop: '0px' }}>{`${getAge(featured.birthdate)} year old ${featured.breed}`}</Typography>
                                <Typography align='left' sx={{ fontSize: '12px', marginTop: '10px' }}>Favorite Toy</Typography>
                                <Typography align='left' sx={{ fontSize: '16px', marginTop: '0px' }}>{featured.favorite_toy}</Typography>
                                <img alt="Black cat cut in half" src={require('../media/cat-cut-in-half.png').default} style={{ marginRight: 'auto', maxWidth: '50px', position: 'absolute', bottom: '0', right: '0' }} />
                            </Box>
                        </Box> : null}
                    </Grid>
                </Grid>
            </Box>
        </Container>
        </>
    )
}

export default Adventures
