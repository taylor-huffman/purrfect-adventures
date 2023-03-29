import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import Adventures from './Adventures';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function AdventureItem({ adventure, user, setUser, setAdventureFormData, setSelectedCat, id, setEditAdventureObject, setCatFormData, cats, setCats, setAdventures, adventures }) {

    // const [heartChecked, setHeartChecked] = useState(user.adventure_likes.some(adv => {
    //     if (adv.adventure_id === adventure.id) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }))

    // useEffect(() => {
    //     fetch('/adventure_likes', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             user_id: user.id,
    //             adventure_id: adventure.id
    //         })
    //     })
    //     .then(r => {
    //         if (r.ok) {
    //             r.json().then(data => console.log(data))
    //         } else {
    //             r.json().then(error => console.log(error))
    //         }
    //     })
    // }, [heartChecked])

    const formatDate = (dateInput) => {
        const date = new Date(dateInput)
        return `${date.toDateString()}, ${date.toLocaleTimeString()}`
    }

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

    // const handleHeartChange = (event) => {
    //     if (!heartChecked) {
    //         setHeartChecked(true);
    //         fetch('/adventure_likes', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 user_id: user.id,
    //                 adventure_id: adventure.id
    //             })
    //         })
    //         .then(r => {
    //             if (r.ok) {
    //                 r.json().then(data => {
    //                     console.log(data)
    //                 })
    //             } else {
    //                 r.json().then(error => console.log(error))
    //             }
    //         })
    //     } else {
    //         setHeartChecked(false);
    //         fetch('/adventure_likes', {
    //             method: 'DELETE',
    //         })
    //         .then(r => {
    //             if (r.ok) {
    //                 r.json().then(data => {
    //                     console.log(data)
    //                 })
    //             } else {
    //                 r.json().then(error => console.log(error))
    //             }
    //         })
    //     }
    //   };

      const handleEditOnClick = () => {
        setAdventureFormData({
            title: adventure.title,
            description: adventure.description,
            location: adventure.location,
        })
        setSelectedCat(adventure.cat.id)
        setEditAdventureObject(adventure)
        setCatFormData(() => {
            return cats.find(cat => cat.id === adventure.cat.id)
        });
        document.getElementById(`adventure-form`).scrollIntoView({ behavior: "smooth" });
      }

      const handleDeleteOnClick = () => {
        fetch(`/adventures/${adventure.id}`, {
            method: 'DELETE'
        })
        .then(r => {
            if (r.ok) {
                setUser({...user, adventures: [...user.adventures.filter(adv => adv.id !== adventure.id)], cats: [...user.cats.filter(cat => {
                    if (user.adventures.filter(adv => adv.cat_id === adventure.cat_id).length > 1) {
                        return cat
                    } 
                    return cat.id !== adventure.cat.id
                })]})
                setCats(cats.filter(cat => cat.id !== adventure.cat.id))
                setAdventures(adventures.filter(adv => adv.id !== adventure.id))
                document.getElementById(`adventure-form`).scrollIntoView({ behavior: "smooth" });
            }
        })
      }

      /*const checkHeartChecked = () => {
        // if (user.adventure_likes && user.adventure_likes.adventure_id === adventure.id) {
        //     setHeartChecked(true)
        //     return heartChecked
        // } else {
        //     setHeartChecked(false)
        //     return heartChecked
        // }
        let boolean
        for (let i = 0; i > user.adventure_likes.length; i++) {
            if ([i].adventure_id === adventure.id) {
                // setHeartChecked(true)
                boolean = true
            } else {
                // setHeartChecked(false)
                boolean = false
            }
        }
        // return heartChecked
      }

      checkHeartChecked()*/

    return (
        <Box key={adventure.id} id={id} sx={{ backgroundColor: '#f8f8f8', marginTop: '20px', padding: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ marginRight: 'auto' }}>
                    <Box sx={{ display: 'flex' }}>
                    <Typography align='left' component='h2' sx={{ fontSize: '20px', fontWeight: 'bold' }}>{adventure.title}</Typography>
                    {adventure.user.id === user.id ? <Stack direction="row"><Button onClick={handleEditOnClick} sx={{ fontSize: '12px', margin: '0 0 0 10px', minWidth: 'unset', color: '#999999' }}>Edit</Button><Button onClick={handleDeleteOnClick} sx={{ fontSize: '12px', margin: '0', minWidth: 'unset', color: '#999999' }}>Delete</Button></Stack> : null}
                    </Box>
                    
                    <Typography align='left' sx={{ fontSize: '12px', color: '#dc242d' }}>{`${adventure.cat.name} | ${getAge(adventure.cat.birthdate)} year old ${adventure.cat.breed} | ${adventure.location}`}</Typography>
                    <Typography align='left' sx={{ fontSize: '12px', color: '#dc242d' }}>{`${formatDate(adventure.created_at)} | By ${adventure.user.username}`}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    
                    <Typography sx={{ color: '#dc242d', fontSize: '16px' }}>{adventure.total_likes}</Typography><Checkbox sx={{ color: '#dc242d' }} checked={heartChecked} onChange={handleHeartChange} inputProps={{ 'aria-label': 'controlled' }} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                </Box> */}
            </Box>
            <Box>
                <Typography align='left' sx={{ fontSize: '16px' }}>{adventure.description}</Typography>
            </Box>
        </Box>
    )
}

export default AdventureItem
