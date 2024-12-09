import { JSX, ReactNode, useEffect, useRef } from 'react';

/* You'll need to install @reach/portal which simplify creating portal*/
import { Portal } from '@reach/portal';

const style = {
  body: 'flex-shrink flex-grow p-4',
  container: 'fixed top-0 left-0 z-40 w-full h-full m-0 overflow-hidden',
  animation: {
    top: 'animate-drawer-top',
  },
  content: 'relative flex flex-col bg-white pointer-events-auto',
  footer:
    'flex flex-wrap items-center justify-end p-3 border-t border-gray-300',
  header: 'items-start justify-between p-4 border-b border-gray-300',
  headerTitle: 'text-2xl md:text-3xl font-light',
  orientation: {
    top: 'flex w-full h-auto absolute top-0 focus:outline-none ',
  },
  overlay: 'fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50',
};

function Drawer({
  children,
  isOpen,
  toggle,
}: {
  children: ReactNode;
  isOpen: boolean;
  toggle: (open: boolean | undefined) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // close modal when you click outside the dialog
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        ref?.current === event.target
        || !ref?.current?.contains(event.target as Node)
      ) {
        if (!isOpen) return;
        toggle(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isOpen, ref]);

  // close modal when you click on "ESC" key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') {
        toggle(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [isOpen]);

  // hide scrollbar and prevent body from moving when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    // Put focus on drawer
    ref.current?.focus();

    const html = document.documentElement;

    const { overflow } = html.style;
    const { paddingRight } = html.style;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    html.style.paddingRight = `${scrollbarWidth}px`;


    return (): void => {
      html.style.overflow = overflow;
      html.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && (
        <>
          <div className={style.overlay} />
          <div className={style.container}>
            <div
              aria-modal={true}
              className={style.orientation.top}
              ref={ref}
              role="dialogue"
              tabIndex={-1}
            >
              <div className={`${style.animation.top} ${style.content}`}>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </Portal>
  );
};

const header = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[] | string | undefined;
}): JSX.Element => (
  <div className={style.header}>
    <h4 className={style.headerTitle}>{children}</h4>
  </div>
);
Drawer.Header = header;

const body = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[] | string | undefined;
}): JSX.Element => <div className={style.body}>{children}</div>;
Drawer.Body = body;

const footer = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => <div className={style.footer}>{children}</div>;
Drawer.Footer = footer;

export default Drawer;
