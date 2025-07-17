import Loader from '@/components/ui/Loader';

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <Loader />
    </div>
  );
}
