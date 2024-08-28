interface MessageProps {
  text: string;
  me: boolean;
}

export default function Message({ text, me }: MessageProps) {
  return (
    <div
      className={`flex ${me ? "justify-end" : "justify-start"} max-h-screen`}
    >
      <div class="py-2 px-1 border-slate-500 text-left">
        <div
          className={`flex flex-col max-w-lg p-2 rounded-lg shadow-md ${
            me ? "bg-gray-100" : "bg-blue-100"
          } `}
        >
          <p className="text-md text-secondary500">{text}</p>
        </div>
      </div>
    </div>
  );
}
