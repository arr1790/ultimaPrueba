'use client';
import { useRouter } from 'next/navigation';

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
    >
      ← Atrás
    </button>
  );
}

export default BackButton;
