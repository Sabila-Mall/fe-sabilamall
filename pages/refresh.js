import { useRouter } from "next/router";
import { useEffect } from "react";

const Refresh = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, [null]);
    return <></>;
};

export default Refresh;
