
import Image from 'next/image';

export default function LoadingLogo() {
  return (
    <div className="animate-pulse">
      <Image
        src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754702167/M_1_1_kwckeh.png"
        alt="Memuat Logo RSU Meloy"
        width={80}
        height={80}
        priority
      />
    </div>
  );
}
