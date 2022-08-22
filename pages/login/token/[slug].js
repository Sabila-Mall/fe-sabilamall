import { useRouter } from "next/router";
import { useEffect } from "react";
import { alreadyLogin, filterObject } from "../../../utils/functions";
import { USER_FIELDS } from "../../../constants/authConstants";
import { useAuthContext } from "../../../contexts/authProvider";
import { Box, Spinner } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import {
    apiLoginByAdmin,
    saveTokenToCookies,
    saveUserIdToCookies,
    saveAdminIdToCookies,
} from "../../../api/Auth";

import { isRequestSuccess } from "../../../utils/api";

const LoginToken = () => {
    const router = useRouter();
    const token = router.query.slug;
    const { setUserData, setIsLoggedIn, loading, setLoading } = useAuthContext();

    useEffect(() => {

        async function loginByAdmin(token) {
            // clear data
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                console.log(name);
                document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            window.localStorage.clear();

            // get data
            const res = await apiLoginByAdmin(token);
            const response = res.data;

            if (isRequestSuccess(response)) {
                setUserData(filterObject(response.data[0], USER_FIELDS));
                saveUserIdToCookies(response.data[0].id);
                saveTokenToCookies(response.data[0].token);
                saveAdminIdToCookies(response.data[0].admin_id);
                setIsLoggedIn(true);
            }

            // redirect
            window.location.replace('/');
        }

        if (router.isReady == true) {
            loginByAdmin(token);
        }
    }, [router.isReady]);

    return (
        <Box style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner />
        </Box >
    );
}


export default LoginToken;