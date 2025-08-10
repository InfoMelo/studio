
import Image from 'next/image';

export default function LoadingLogo() {
  return (
    <div className="animate-pulse">
      <Image
        src="https://res.cloudinary.com/ddyqhlilj/image/upload/v1754800465/logo_meloy_l6pnrf.svg"
        alt="Memuat Logo RSU Meloy"
        width={80}
        height={80}
        priority
      />
    </div>
  );
}
