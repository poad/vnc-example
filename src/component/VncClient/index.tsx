import { useEffect, useState } from 'react';
import { VncScreen } from 'react-vnc';

interface VncClientProps {
  container?: Element;
  url: string;
}

function VncClient(
  props: VncClientProps,
) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(props.url);
  }, [props]);

  return url.length > 0 ? (
    <>
      <VncScreen
        url={url}
        scaleViewport
        background="#000000"
        resizeSession={true}
        style={{
          width: '95vw',
          height: '95vh',
        }}
      />
    </>
  ) : (
    <div>VNC URL not provided.</div>
  );
};

export default VncClient;
