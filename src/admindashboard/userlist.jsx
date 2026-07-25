import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Navbar from "./navbar";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [otps, setOtps] = useState([]);

    // Fetch user data
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/auth/users/descending');
            const usersData = response.data.map(user => ({
                id: user.id,
                UserName: user.name,
                Email: user.email,
                Phonenumber: user.phoneNumber,
                Role:user.role,
                Status:user.enabled === true ? 'Active' : 'Disabled'
            }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    // Fetch OTP data
    const fetchOtps = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/auth/otps/descending');
            const otpsData = response.data.map(otp => ({
                id: otp.id, // Ensure this matches the key in the OTP response that links to the user
                Joined: otp.createdAt
            }));
            setOtps(otpsData);
        } catch (error) {
            console.error("Error fetching OTP data:", error);
        }
    };

    const userdata = users.map(user => {
        const otpData = otps.find(otp => otp.id === user.id);
        return {
            ...user,
            Joined: otpData ? new Date(otpData.Joined).toLocaleString()  : 'N/A'
        };
    });

    useEffect(() => {
        fetchUsers();
        fetchOtps();
    });

    return (
    //     <div className="p-6 bg-white h-full rounded-md">
    //         <div className="border  border-gray-300 rounded-lg overflow-hidden">
    //             <DataTable value={userdata} paginator rows={10} className="datatable-basic custom-header">
    //                 <Column field="id" header="ID" className="border border-gray-300" />
    //                 <Column field="UserName" header="UserName" className="border border-gray-300" />
    //                 <Column field="Email" header="Email" className="border border-gray-300" />
    //                 <Column field="Phonenumber" header="Phonenumber" className="border border-gray-300" />
    //                 <Column field="Role" header="Role" className="border border-gray-300" />
    //                 <Column field="Joined" header="Joined" className="border border-gray-300" />
    //                 <Column field="Status" header="Status" className="border border-gray-300" />
    //             </DataTable>
    //         </div>
    //     </div>
    
    <div className="p-6 flex flex-col gap-6">
             <div className="px-8 py-4 bg-white/70 flex items-center gap-20 rounded-xl">
<span className="text-sm font-semibold">Profile</span>
        <div className="w-16 h-1 "></div>
        <div className="flex flex-col">
        <div className="w-6 h-1 "></div>
         <span className="text-xs text-gray-500 tracking-wider"></span>
        </div>
        <span className="text-sm font-semibold">Mail</span>
            <span className="text-sm ml-16 font-semibold">Phone Number</span>
                  <span className="text-sm -ml-3 font-semibold">Role</span>
                                    <span className="text-sm ml-7 font-semibold">Joined</span>
  <span className="text-sm font-semibold ml-7">Status</span>

     </div>

             <div className="px-8 py-6 bg-white/70 flex items-center justify-between rounded-xl">
        <img src="profile.jpg" className="rounded-full h-12 w-12" />
        <span className="font-semibold text-gray-500">#598754</span>
        <div className="flex flex-col">
         <span className="font-semibold">DJ Rio</span>
         <span className="text-xs text-gray-500 tracking-wider">COUNTRY</span>
        </div>
        <span className="text-sm">dj45@gmail.com</span>
            <span className="text-sm">+91 9876543210</span>
                  <span className="text-sm">Music Mixer</span>
                                    <span className="text-sm">July 06, 2026</span>
  <span className="text-sm font-semibold text-cta">Active</span>

     </div>
     <div className="px-8 py-6 bg-white/70 flex items-center justify-between rounded-xl">
        <img src="profile.jpg" className="rounded-full h-12 w-12" />
        <span className="font-semibold text-gray-500">#598754</span>
        <div className="flex flex-col">
         <span className="font-semibold">DJ Rio</span>
         <span className="text-xs text-gray-500 tracking-wider">COUNTRY</span>
        </div>
        <span className="text-sm">dj45@gmail.com</span>
            <span className="text-sm">+91 9876543210</span>
                  <span className="text-sm">Music Mixer</span>
                                    <span className="text-sm">July 06, 2026</span>
  <span className="text-sm font-semibold text-cta">Active</span>

     </div>
    </div>
    );
};

export default UserList;
