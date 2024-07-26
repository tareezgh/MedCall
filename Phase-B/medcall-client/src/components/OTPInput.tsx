import React, { useState, ChangeEvent } from 'react';
const OTPInput = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

    const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newOtp = [...otp];
      const { value } = event.target as HTMLInputElement; // Type assertion to ensure 'value' is accessible
      newOtp[index] = value;
      setOtp(newOtp);
    };

  return (
    <div className="flex justify-between space-x-4 mb-6">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 border border-cyan-900 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={handleChange(index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
