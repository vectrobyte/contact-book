import Spinner from '@/components/spinners/Spinner';

type OverlayProps = React.HTMLAttributes<HTMLElement> & {
  loading?: boolean;
};

const Overlay: React.FC<OverlayProps> = ({ loading, children }) => {
  return (
    <div className="relative">
      {children}
      <div
        className={`z-100 absolute inset-0 opacity-80 ${
          loading ? 'flex items-center justify-center bg-white' : 'hidden'
        }`}
      >
        <Spinner className="w-8" />
      </div>
    </div>
  );
};

export default Overlay;
