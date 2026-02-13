import React, { useState, useEffect } from "react";

function PopUpMessage({ statusMessage }) {
    const [showModalApi, setShowModalApi] = useState(true);

    useEffect(() => {
        setShowModalApi(true); // reset when new statusMessage arrives
    }, [statusMessage]);

    const isSuccess = statusMessage?.status === "success";
    if (!showModalApi) return null;

    return (
        <div
            className="
        fixed inset-0 flex items-center justify-center
        bg-black/50 z-[1050]
      "
        >
            <div className="bg-white rounded-lg p-4 w-[350px] shadow-lg">
                {isSuccess ? (
                    <>
                        <h5 className="text-green-600 font-semibold mb-3">Success</h5>
                        <p className="text-center text-gray-800">{statusMessage?.message}</p>
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="
                                        bg-green-600 hover:bg-green-700
                                        text-white font-medium
                                           px-4 py-1 rounded cursor-pointer"
                                onClick={() => setShowModalApi(false)}
                            >
                                Got It
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h5 className="text-red-600 font-semibold mb-3">Failed</h5>
                        <p className="text-center text-gray-800">{statusMessage?.message}</p>
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                className="
                                        bg-red-600 hover:bg-red-700
                                        text-white font-medium
                                          px-4 py-1 rounded cursor-pointer"
                                onClick={() => setShowModalApi(false)}
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PopUpMessage;
