export const metadata = {
    title: "مصنف کے بارے میں | Writer's Website",
    description: "یہاں آپ مصنف کے بارے میں جان سکتے ہیں۔",
  };
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50 text-gray-900">
        <h1 className="text-4xl font-bold mb-4">مصنف کے بارے میں</h1>
        <p className="text-lg max-w-2xl">
          میں ایک مصنف ہوں جو کہانیاں، شاعری اور مضامین لکھنے کا شوق رکھتا ہوں۔
        </p>
      </main>
    );
  }
  