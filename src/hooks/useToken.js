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

            fetch(`https://tools-factory.herokuapp.com/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })}
        }, [user]);

    return [token];
}

export default useToken;