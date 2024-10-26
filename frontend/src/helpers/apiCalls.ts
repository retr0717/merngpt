import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', {email,password});
    console.log(await res.data);
    if(res.status !== 200)
    {
        throw new Error('Login Unsuccessful');
    }

    const data = await  res.data;
    console.log("data : ", data);
    return data;    
}

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');
    console.log(await res.data);
    if(res.status !== 200)
    {
        throw new Error('Authentication Unsuccessful');
    }

    const data = await  res.data;
    console.log("data : ", data);
    return data;    
}