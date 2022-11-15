import { useRouter } from "next/router";
import { useEffect } from "react";

const Clear = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, [null]);
    return <></>;
};

export default Clear;
