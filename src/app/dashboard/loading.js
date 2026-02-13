'use client'
import { BallTriangle } from 'react-loader-spinner'

export default function Loading() {

    return (
        <div className='flex justify-center items-center'>
            <BallTriangle
                height={80}
                width={80}
                radius={9}
                color="green"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}
