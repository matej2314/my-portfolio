import { useEffect } from "react";

export default function Redirect({ link }) {
    useEffect(() => {
        window.location.href = link;
    })
}