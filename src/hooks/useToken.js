import { useEffect, useState } from "react";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (user) {
            const email = user?.user?.email;
            const currentUser = {
                name: user?.user?.displayName,
                email: email
            };
            //`https://tools-factory.herokuapp.com/user/${email}`
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    localStorage.setItem('accessToken', data.token);
                    setToken(data.token);
                })
        }
    }, [user]);

    return [token];
}

export default useToken;