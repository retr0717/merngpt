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