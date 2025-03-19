import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ title, author, coverImage, onlineReadLink, downloadLink }) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 m-4">
      <div className="relative h-64 w-full">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="px-6 py-4 text-right">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-4">{author}</p>
        <div className="flex justify-end gap-6 space-x-reverse">
          {onlineReadLink && (
            <Link
              href={onlineReadLink}
              className="bg-[#da713a] text-white px-4 py-2 rounded-md hover:bg-[#c4632f] transition-colors duration-300"
            >
              آن لائن پڑھیں
            </Link>
          )}
          {downloadLink && (
            <Link
              href={downloadLink}
              className="border-2 border-[#da713a] text-[#da713a] px-4 py-2 rounded-md hover:bg-[#da713a] hover:text-white transition-colors duration-300"
            >
              ڈاؤن لوڈ کریں
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}