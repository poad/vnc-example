import { JSX, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import Drawer from '../component/Drawer';

const DynamicComponent = dynamic(() => import('../component/VncClient'), {
  ssr: false,
});

function Home(): JSX.Element {
  const [vncUrl, setVncUrl] = useState('');
  const [inputScheme, setInputScheme] = useState('ws');
  const [inputHost, setInputHost] = useState('');
  const [inputPort, setInputPort] = useState<number>(6080);
  const [open, setOpen] = useState<boolean>(false);

  const connect = () => {
    if (inputHost.length > 0) {
      const url = `${inputScheme}://${inputHost}:${inputPort}`;
      setVncUrl(url);
      setOpen(false);
    }
  };

  const validate = (value: string): boolean => Number.isInteger(value);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Head>
        <title>Web VNC Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <button
            type="button"
            onClick={toggle}
            className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-2 w-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Drawer isOpen={open} toggle={toggle}>
            <Drawer.Body>
              <div>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-3 sm:p-4">
                    <select
                      className="rounded-md py-2.5"
                      onChange={({ target: { value } }) => {
                        setInputScheme(value);
                      }}
                    >
                      <option>ws</option>
                      <option>wss</option>
                    </select>
                    { }
                    <input
                      type="text"
                      name="host"
                      id="host"
                      x-model="host"
                      className="focus:ring-indigo-500 justify-center focus:border-indigo-500 flex-1 mx-1 px-4 py-3 w-96 rounded-md sm:text-sm border-gray-300"
                      placeholder="your-vnc-url"
                      onChange={({ target: { value } }) => {
                        setInputHost(value);
                      }}
                      aria-describedby="urlHelp"
                      value={inputHost}
                    />
                    <input
                      type="text"
                      name="port"
                      id="port"
                      x-model="port"
                      className="focus:ring-indigo-500 justify-center focus:border-indigo-500 flex-1 mx-2 px-4 py-3 w-15 rounded-md sm:text-sm border-gray-300"
                      placeholder="6080"
                      onChange={({ target: { value } }) => {
                        if (value.length > 0 && validate(value)) {
                          setInputPort(Number.parseInt(value, 10));
                        }
                        if (value.length === 0) {
                          setInputPort(6080);
                        }
                      }}
                    />
                    <button
                      onClick={connect}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Connect
                    </button>
                    { }
                  </div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer>
        </div>
        <div className="m-l-8">
          <DynamicComponent url={vncUrl} />
        </div>
      </main>

      <footer />
    </div>
  );
};

export default Home;
