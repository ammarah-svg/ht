import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-4">خوش آمدید</h1>
      <p className="text-lg max-w-2xl">
        یہ ایک مصنف کی ویب سائٹ ہے جہاں آپ کہانیاں، مضامین اور شاعری پڑھ سکتے ہیں۔
      </p>
    </main>
  );
}
