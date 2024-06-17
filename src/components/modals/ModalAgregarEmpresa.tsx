import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalAgregarEmpresa: React.FC<ModalProps> = ({ show, onClose,  children }) => {
    if (!show) {
        return null;
    }
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)] flex items-center justify-center backdrop-blur-sm" onClick={handleBackgroundClick}>
            <div className="bg-slate-900 rounded-md max-w-[500px] w-full px-5 pb-5 pt-1 shadow-[0 5px 15px rgba(0, 0, 0, 0.3)]">

                <div className="my-5 mx-0">
                    {children}
                </div>
                <div className="flex justify-center border-t-2 border-white pt-3 mb-[-6px]">
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarEmpresa;
