import Button from "./Button";
import { PhoneIcon } from './icons';
// messages section for the user
const Messages = () => {

  const renderLeftSide = () => {
    return (
      <>
        <div className="mt-4 left-side flex flex-col gap-4 w-[20%]">
          {/* the header */}
          <h1 className="text-4xl w-full text-start">
            Messages
          </h1>

          <div className="flex flex-col items-center justify-center gap-4 w-full text-center">
            <button
              onClick={() => { }}
              className="flex flex-col items-center justify-center p-4 w-full bg-white rounded-lg shadow-md hover:bg-gray-200"
            >
              <h1 className="text-lg font-bold">Yosef Levy</h1>
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderChatMessage = (message: string, sender: string, time: string) => {
    return (
      <div className={`flex ${sender === "Avi" ? "justify-start" : "justify-end"} mb-2`}>
        <div className={`max-w-xs p-2 rounded-lg shadow-md ${sender === "Avi" ? "bg-gray-100" : "bg-blue-100"} flex flex-col`}>
          <p className="text-sm text-left">{message}</p>
          <span className="text-xs text-gray-500 self-end">{time}</span>
        </div>
      </div>
    );
  };

  const renderRightSide = () => {
    return (
      <div className="right-side w-[80%] flex flex-col">
        <Button
          text="Request New Ambulance"
          type="primary"
          onClick={() => { }}
          customClassName={"ml-auto p-4 rounded-2xl shadow-md text-xl"}
        />
        <div className="mt-4 bg-white rounded-lg shadow-md min-h-96 flex flex-col p-4">
          {/* Chat header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-300">
            <h2 className="text-xl font-bold">Yosef Levy</h2>
            <button className="p-2 bg-gray-200 rounded-full">
              <PhoneIcon />
            </button>
          </div>
          {/* Chat messages */}
          <div className="flex flex-col gap-2 mt-4">
            {renderChatMessage("Hello, this is Avi with ambulance service. Do you know the patient?", "Avi", "10:30")}
            {renderChatMessage("Hi, yes he is my friend, there's been a car accident", "User", "10:31")}
            {renderChatMessage("Are there any other injuries?", "Avi", "10:31")}
            {renderChatMessage("Yes, two persons seems unconscious.", "User", "10:32")}
            {renderChatMessage("Please hurry!", "User", "10:32")}
            {renderChatMessage("Stay with your friend", "Avi", "10:32")}
            {renderChatMessage("Help is on the way", "Avi", "10:32")}
          </div>
          <div className="flex flex-row space-x-2">
            <input
              className="rounded-2xl shadow-2xl w-full border border-blue-950 text-left p-2" placeholder="Type your message here...">
            </input>
            <button className="p-2 bg-gray-200 rounded-full">
              {/* send icon */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.3337 2.66663L14.667 17.3333" stroke="#3C4B78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.0003 29.3333L29.3337 2.66663L2.66699 12L14.667 17.3333L20.0003 29.3333Z" stroke="#3C4B78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-4">
        {renderLeftSide()}
        {renderRightSide()}
      </div>
    </>
  );

};

export default Messages;