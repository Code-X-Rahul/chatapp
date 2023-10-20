import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/data';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState('')

    let param2 = []
    searchParams.forEach(entry => param2.push(entry))


    useEffect(() => {
        (async () => {
            try {
                const response = await api.post('/api/v1/auth/verify-email', { verificationToken: param2[0], email: param2[1] })
                console.log(response.data);
                setResponse(response?.data?.msg)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <div>{response}</div>
    )
}

export default Verify