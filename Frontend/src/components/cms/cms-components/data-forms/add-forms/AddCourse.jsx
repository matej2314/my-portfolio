import { useEffect, useState, useRef } from "react"
import useSendRequest from '../../../../../hooks/useSendRequest';



export default function AddCourse() {

    const { sendRequest, result, isLoading, error } = useSendRequest();

    return (
        <div>
            <h2>Edit selected course</h2>
            <form >
                <label></label>
                <input />
                <label htmlFor=""></label>
                <input />
                <input type="submit" value="" />
            </form>
        </div>
    )
}