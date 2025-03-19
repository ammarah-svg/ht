export const metadata = {
    title: "کہانیاں | Writer's Website",
    description: "یہاں مصنف کی لکھی ہوئی کہانیاں موجود ہیں۔",
  };
  
  import BookCard from '@/components/BookCard';

const sampleBooks = [
  {
    title: 'پہلی کہانی',
    author: 'احمد حسین',
    coverImage: '/books/unsplash-book-cover.jpg',
    onlineReadLink: '/stories/story1',
    downloadLink: '/api/download/story1.pdf'
  },
  {
    title: 'دوسری کہانی',
    author: 'فاطمہ علی',
    coverImage: '/books/sample-cover-2.jpg',
    onlineReadLink: '/stories/story2',
    downloadLink: '/api/download/story2.pdf'
  },
  {
    title: 'تیسری کہانی',
    author: 'محمد عمر',
    coverImage: '/books/sample-cover-3.jpg',
    onlineReadLink: '/stories/story3',
    downloadLink: '/api/download/story3.pdf'
  }
];

export default function Stories() {
  return (
    <main className="min-h-screen p-6 pt-20 bg-white text-gray-900">
      <div className="container mx-auto">
        <h1 className="text-4xl mt-5 font-bold mb-16 text-center">کہانیاں</h1>
        <p className="text-lg max-w-2xl mx-auto text-center mb-8">
          یہاں مصنف کی لکھی ہوئی تمام کہانیوں کی فہرست موجود ہے۔
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {sampleBooks.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </main>
  );
}
  