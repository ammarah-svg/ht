export const metadata = {
    title: "کہانیاں | Writer's Website",
    description: "یہاں مصنف کی لکھی ہوئی کہانیاں موجود ہیں۔",
  };
  
  export default function Stories() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-gray-900">
        <h1 className="text-4xl font-bold mb-4">کہانیاں</h1>
        <p className="text-lg max-w-2xl">
          یہاں مصنف کی لکھی ہوئی تمام کہانیوں کی فہرست موجود ہے۔
        </p>
      </main>
    );
  }
  