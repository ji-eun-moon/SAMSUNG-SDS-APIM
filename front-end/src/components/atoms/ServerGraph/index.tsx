import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@/components/organisms/Modal';

interface ServerGraphProps {
  src: string;
  from?: string;
  width?: string;
}

function ServerGraph({ src, from, width }: ServerGraphProps) {
  const defaultSrc = 'https://k9c201.p.ssafy.io/grafana/d-solo/spring_boot_21/spring-boot-3-x-statistics?orgId=1';
  const [iframeMouseOver, setIframeMouseOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  const onModalHandler = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const onWindowBlur = () => {
      if (iframeMouseOver) {
        onModalHandler();
      }
    };

    window.focus();
    window.addEventListener('blur', onWindowBlur);

    return () => {
      window.removeEventListener('blur', onWindowBlur);
    };
  }, [iframeMouseOver, onModalHandler]);

  const handleOnMouseOver = () => {
    setIframeMouseOver(true);
  };

  const handleOnMouseOut = () => {
    window.focus();
    setIframeMouseOver(false);
  };

  return (
    <div className="w-full pb-1 px-1" style={{ overflow: 'hidden', height: '100%' }}>
      <div
        className="iframeWrapper h-full"
        onMouseOver={() => {
          setModalSrc(src);
          handleOnMouseOver();
        }}
        onMouseOut={handleOnMouseOut}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        {src.includes('http') ? (
          <iframe src={src} style={{ width: `${width}`, height: '100%', border: 'none' }} title="Server Graph" />
        ) : (
          <iframe
            src={`${defaultSrc}&from=${from}&to=now&refresh=1s&theme=light&${src}`}
            style={{ width: `${width}`, height: '22vh', border: 'none' }}
            title="Server Graph"
          />
        )}
      </div>

      {isModalOpen && (
        <Modal type="server" onClose={onModalHandler}>
          <div>
            {src.includes('http') ? (
              <iframe src={src} style={{ width: '75vw', height: '75vh', borderRadius: '10px' }} title="Server Graph" />
            ) : (
              <iframe
                src={`${defaultSrc}&from=now-30m&to=now&refresh=5s&theme=light&${modalSrc}`}
                style={{ width: '75vw', height: '65vh', borderRadius: '10px' }}
                title="Server Modal Graph"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

ServerGraph.defaultProps = {
  from: 'now-10m',
  width: '100%',
};
export default ServerGraph;
