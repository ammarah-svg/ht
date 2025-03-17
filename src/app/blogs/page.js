export const metadata = {
    title: "بلاگ | Writer's Website",
    description: "یہاں آپ مصنف کے بلاگز پڑھ سکتے ہیں۔",
  };
  
  export default function BlogPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white text-gray-900">
        <h1 className="text-4xl font-bold mb-4">بلاگ</h1>
        <p className="text-lg max-w-2xl">
          یہاں مصنف کی تازہ ترین تحریریں شائع کی جاتی ہیں۔
        </p>
      </main>
    );
  }
  