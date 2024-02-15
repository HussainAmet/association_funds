import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { login as authLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux'
import { getAllMembersDetails, getMemberDetails } from '../store/memberDetailsSlice';

export default function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('')
    try {
      const userData = await axios.post("/association-funds/login", {phone: data.number})
      if (userData.data) {
        dispatch(authLogin({userData: userData.data.member.data.auth}));
        dispatch(getMemberDetails({member: userData.data.member.data}));
        const role = userData.data.member.data.auth.data.role;
        if (role === "host") {
          dispatch(getAllMembersDetails({allMembers: userData.data.members}));
          navigate("/admin/members/members-list");
        } else if (role === "member") {
          navigate("/dashboard/profile");
        } else {
          setError("Phone number not found");
        }
      } else setError("Phone number not found")
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#0d6efd' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {error && <span className='text-danger mt-1'>{error}</span>}
        {errors.number && (errors.number.type === "minLength" || errors.number.type === "maxLength") && <span className='text-danger mt-1'>Invalid Number</span>}
        <Box component="form" onSubmit={handleSubmit(login)} sx={{ mt: 1 }}>
          <TextField
            type='number'
            onInput={(e) => {e.target.value = e.target.value.replace(/[^0-9]/g, '');}}
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            onWheel={(e) => e.target.blur()}
            {...register("number", {
              maxLength: { value: 10, message: "max" },
              minLength: { value: 10, message: "min" },
            })}
          />
          <Button
            type='submit'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='py-3'
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}