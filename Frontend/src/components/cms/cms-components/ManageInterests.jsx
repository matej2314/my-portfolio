import { useState, useContext } from 'react';
import { DataContext } from '../../../store/data-context';
import { cmsComponents } from './cms-componenst-styles';


export default function ManageInterests() {
    const { refreshData } = useContext(DataContext);
    return (
        <p>Manage interests</p>
    )
}