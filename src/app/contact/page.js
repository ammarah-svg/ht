import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "رابطہ کریں | Writer's Website",
  description: "مصنف سے رابطہ کرنے کے لیے یہ صفحہ استعمال کریں۔",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-12">
        <div className="flex justify-center items-center absolute inset-0 z-0" 
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/034/073/373/small_2x/a-bookshelf-with-many-books-ai-generated-photo.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute flex items-center justify-center inset-0 bg-black/50 z-1">
            <main className="relative z-10 max-w-xl w-full bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-lg text-white my-8">
              <ContactForm />
            </main>
          </div>
        </div>
      </section>
    </>
  );
}