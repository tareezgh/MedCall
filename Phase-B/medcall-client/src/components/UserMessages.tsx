import { useEffect, useState,useRef } from 'preact/hooks';
import Peer, { DataConnection } from 'peerjs';
import Message from './Messages';
import { peerConfig } from '../utils/config';
import Button from './Button';
import { PhoneIcon } from './icons';

export default function Chat() {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<DataConnection | null>(null);
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState<{ me: boolean; text: string }[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const pr = new Peer(peerConfig);
    setPeer(pr);

    return () => {
      pr.destroy();
    };
  }, []);

  useEffect(() => {
    if (!peer) return;

    peer.on('open', (id) => {
      console.log('Peer ID', id);
      setAddress(id);
    });

    peer.on('connection', (con) => {
      console.log('Connection received');
      con.on('open', () => {
        console.log('Connected');
        setRecipient(con.peer);
        setConnection(con);
      });

      con.on('data', (data) => {
        handleData(data as string);
      });

      con.on('close', () => {
        disconnect();
      });

      con.on('error', (err) => {
        console.error('Connection error:', err);
      });
    });
  }, [peer]);

  const connectRecipient = (e: Event) => {
    e.preventDefault();
    if (connection) {
      disconnect();
    } else {
      connect(recipient);
    }
  };

  const connect = (recId: string) => {
    if (peer) {
      const con = peer.connect(recId);
      setConnection(con);

      con.on('open', () => {
        console.log('Connection established - sender');
      });

      con.on('data', (data) => {
        handleData(data as string);
      });

      con.on('close', () => {
        disconnect();
      });

      con.on('error', (err) => {
        console.error('Connection error:', err);
      });
    }
  };

  const disconnect = () => {
    if (connection) {
      connection.close();
      setConnection(null);
    }
    setRecipient('');
    setMessages([]);
    setMessage('');
  };

  const handleData = (data: string) => {
    console.log(data);
    setMessages((prevMessages) => [...prevMessages, { me: false, text: data }]);
  };

  const handleSend = (e: Event) => {
    e.preventDefault();
    if (connection) {
      setMessages((prevMessages) => [...prevMessages, { me: true, text: message }]);
      connection.send(message);
      setMessage('');
    }
  };

  const renderLeftSide = () => {
    return (
      <>
        <div className="mt-4 left-side flex flex-col gap-4 w-[20%]">
          {/* the header */}
          <h1 className="text-4xl w-full text-start">
            Messages
          </h1>
          {/* here we are supposed to get the chat history, in the mean time this is 'mock data' */}
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex gap-4">
      {/* left side is where the chat history is
      yosef levy is added manually */}
      {renderLeftSide()}
      {/* right side here */}
      <div className="right-side w-[80%] flex flex-col">
        <Button
          text="Request New Ambulance"
          type="primary"
          onClick={() => { }}
          customClassName={"ml-auto p-4 rounded-2xl shadow-md text-xl"}
        />
        {/* start from here forging this shit */}
        <div className="mt-4 bg-white rounded-lg shadow-md min-h-96 flex flex-col p-4">
          {peer && (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                {/* name inserted manually */}
                <h2 className="text-xl font-bold">Yosef Levy</h2>
                <button className="p-2 bg-gray-200 rounded-full">
                  <PhoneIcon />
                </button>
              </div>
              <div class="flex justify-start w-full gap-2 pb-4">
                <div class="w-1/2">
                  <div class="text-slate-400">My address</div>
                  <div class="selectable">{address}</div>
                </div>
                <div class="w-1/2">
                  <div class="text-slate-400">Recipient</div>
                  <form onSubmit={connectRecipient}>
                    <div class="flex justify-start gap-2">
                      <input
                        type="text"
                        required
                        readOnly={!!connection}
                        class="bg-slate-100 w-full"
                        value={recipient}
                        onInput={(e) => setRecipient((e.target as HTMLInputElement).value)}
                      />
                      <button type="submit" class="border border-slate-500 hover:border-slate-300 py-1 px-2">
                        {connection ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* if connection was successful */}
              {connection && (
                <div className="flex flex-col h-96">
                  <div className="overflow-y-auto flex-grow">
                    {messages.map((msg, index) => (
                      <Message key={index} text={msg.text} me={msg.me} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={handleSend} className="flex justify-start gap-2 mt-4">
                    <input
                      type="text"
                      value={message}
                      onInput={(e) => setMessage((e.target as HTMLInputElement).value)}
                      className="grow bg-slate-100"
                    />
                    <button type="submit"
                      className="py-1 px-2 border border-black hover:border-slate-300">
                      Send
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
