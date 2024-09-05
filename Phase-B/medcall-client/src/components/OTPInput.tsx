import { useRef } from "preact/hooks";
import { ChangeEvent } from "preact/compat";

interface OTPInputProps {
  otp: string[];
  setOtp: (value: string[]) => void;
}
const OTPInput = ({ otp, setOtp }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const newOtp = [...otp];
      const { value } = event.target as HTMLInputElement;
      
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits

      newOtp[index] = numericValue;
      setOtp(newOtp);

      // Move to next input if current input is filled
      if (numericValue && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

  const handleKeyDown = (index: number) => (event: KeyboardEvent) => {
    // Handle Backspace key to move focus back
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between space-x-4 mb-6">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          maxLength={1}
          className=" border border-secondary500 rounded-xl focus:outline-none focus:border-blue-500 w-12 h-12  text-center text-xl focus:ring-2 "
        />
      ))}
    </div>
  );
};

export default OTPInput;
