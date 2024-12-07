import { useState, useContext } from 'react';
import { DataContext } from '../../../store/data-context';
import { cmsComponents } from './cms-componenst-styles';


export default function ManageInterests() {
    const { refreshData, fetchedData, isLoading } = useContext(DataContext);
    const interests = fetchedData.data.interests;
    console.log(interests)


    return (
        <div className={cmsComponents.wrapper.wrapper}>
            <h2 className={cmsComponents.h2.h2}>Interests in DB:</h2>
            <ul className='w-1/3 h-full flex flex-col justify-center items-center'>
                {!isLoading && interests && Array.isArray(interests) ? (
                    interests.map((interest) => {
                        <li className='w-full flex justify-around'>
                            <span>{interest.id}</span>
                            {interest.intName}
                        </li>
                    })
                ) : (
                    <div className={cmsComponents.managePosts.noPostsLi}>
                        <p>Brak zainteresowań</p>
                    </div>
                )}
            </ul>
        </div>
    )
}