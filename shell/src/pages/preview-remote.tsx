// import { TableResponsive } from "remoteApp/Remote"

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const TableResponsive = dynamic(()=>import("remoteApp/Remote").then(m=>m.TableResponsive), {ssr: false});

const Preview = ()=>{
    const router = useRouter();
    return <div>
        <h1>Preview Component Remote</h1>
        <TableResponsive />
    </div>
}

export default Preview;