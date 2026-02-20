'use client'
import CapsCard from '@/app/components/caps_card/CapsCard'
import PageCard from '@/app/components/caps_card/PageCard'
import PopUpMessage from '@/app/components/PopUpMessage';
import Spinner from '@/app/components/Spinner';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


function retailUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "-1" });
    const [openModal, setOpenModal] = useState(false);
    const [statusMessage, setStatusMessage] = useState({
        status: "error",
        message: "Somethin went wrong please try again.",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
        
    }

    const handleSubmit = () => {

        if (formData?.name === "-1") {
            setStatusMessage({
                status: "error",
                message: "Please select any type of internal user.",
            });
            setOpenModal(true);
            return;
        }
        if (formData?.name === 'activityadmin') {
            router.push("/dashboard/activity/user-registration/internal-user/activity-admin");
        }
        if (formData?.name === 'activityuser') {

            router.push("/dashboard/activity/user-registration/internal-user/activity-user");
        }
        if (formData?.name === 'portalUser') {

            router.push("/dashboard/activity/user-registration/internal-user/portal-admin");
        }
        if (formData?.name === 'PortalAdmin') {
            router.push("/dashboard/activity/user-registration/internal-user/portal-user");

        }
        if (formData?.name === 'Egen') {
            router.push("/dashboard/activity/user-registration/internal-user/api-client");

        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000)
    }

    return (
        <div className="p-1 text-[#226b88]">
            <CapsCard
                title="Retail User"
                description="Add new retail users to the system"
            />
            {/* main div */}
            <PageCard>
                <div className="w-full">
                    <div className="grid gap-2">
                        <div className='flex justify-center'>
                            {/* form */}
                            <div className='grid grid-cols-[1fr_0.5fr_2fr] gap-2'>
                                <label htmlFor="name">Select</label>
                                <div className='text-center'>:</div>
                                <div className=''>
                                    <select id="name" name="name" className="capsSelect w-80 " onChange={handleChange} >
                                        <option value="-1">Select</option>
                                        <option value="mds">Master Distributor</option>
                                        <option value="ds">Distributor</option>
                                        <option value="agent">Agent</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className="capsButton min-w-[100px] flex items-center justify-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </PageCard>
            {/* modal */}
            <div>
                {
                    openModal && (
                        <PopUpMessage statusMessage={statusMessage} />
                    )
                }
            </div>
        </div>
    )
}

export default retailUser