import axios from 'axios';

export const userLogout = async () => {
    const res = await axios.get('/user/logout');

    console.log(await res.data);

    if(res.status !== 200)
    {
        throw new Error('Logout Unsuccessful');
    }

    const data = await  res.data;
    return data;    
}

export const deleteChats = async () => {
    const res = await axios.delete('/chat/delete');

    console.log(await res.data);

    if(res.status !== 200)
    {
        throw new Error('Delete Chat Unsuccessful');
    }

    const data = await  res.data;
    return data;    
}

export const getUserChats = async () => {
    const res = await axios.get('/chat/all-chats',);
    console.log(await res.data);

    if(res.status !== 200)
    {
        throw new Error('Get All Chat Unsuccessful');
    }

    const data = await  res.data;
    return data;    
}

export const sendChatRequest = async (message : string) => {
    const res = await axios.post('/chat/new', { message });
    console.log(await res.data);

    if(res.status !== 200)
    {
        throw new Error('Sent Chat Unsuccessful');
    }

    const data = await  res.data;
    return data;    
}

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', {email,password});

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

    if(res.status !== 200)
    {
        throw new Error('Authentication Unsuccessful');
    }

    const data = await  res.data;
    return data;    
}