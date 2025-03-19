export const metadata = {
  title: "کہانی | Writer's Website",
  description: "کہانی پڑھیں",
};

import { notFound } from 'next/navigation';

const stories = {
  'story1': {
    title: 'پہلی کہانی',
    author: 'احمد حسین',
    content: `
      <p>یہ پہلی کہانی کا مکمل متن ہے۔ یہاں کہانی کا مکمل متن ہوگا۔</p>
      <p>یہ دوسرا پیراگراف ہے۔</p>
      <p>یہ تیسرا پیراگراف ہے۔</p>
    `
  },
  'story2': {
    title: 'دوسری کہانی',
    author: 'فاطمہ علی',
    content: `
      <p>یہ دوسری کہانی کا مکمل متن ہے۔ یہاں کہانی کا مکمل متن ہوگا۔</p>
      <p>یہ دوسرا پیراگراف ہے۔</p>
      <p>یہ تیسرا پیراگراف ہے۔</p>
    `
  },
  'story3': {
    title: 'تیسری کہانی',
    author: 'محمد عمر',
    content: `
      <p>یہ تیسری کہانی کا مکمل متن ہے۔ یہاں کہانی کا مکمل متن ہوگا۔</p>
      <p>یہ دوسرا پیراگراف ہے۔</p>
      <p>یہ تیسرا پیراگراف ہے۔</p>
    `
  }
};

export default function StoryPage({ params }) {
  const story = stories[params.id];

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 pt-20 bg-white text-gray-900">
      <div className="container mx-auto max-w-3xl">
        <article className="prose prose-lg mx-auto text-right" dir="rtl">
          <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
          <p className="text-xl mb-8 text-gray-600">{story.author}</p>
          <div 
            className="leading-relaxed text-xl"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </article>
      </div>
    </main>
  );
}