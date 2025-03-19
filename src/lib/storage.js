import { supabase } from './supabase';

// Storage bucket names
const BOOK_COVERS_BUCKET = 'book-covers';
const BOOK_FILES_BUCKET = 'book-files';

// Initialize storage buckets if they don't exist
async function initializeBuckets() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (!buckets?.find(b => b.name === BOOK_COVERS_BUCKET)) {
    await supabase.storage.createBucket(BOOK_COVERS_BUCKET, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    });
  }

  if (!buckets?.find(b => b.name === BOOK_FILES_BUCKET)) {
    await supabase.storage.createBucket(BOOK_FILES_BUCKET, {
      public: false,
      fileSizeLimit: 104857600, // 100MB
      allowedMimeTypes: ['application/pdf']
    });
  }
}

// Upload book cover image
export async function uploadBookCover(file, fileName) {
  try {
    const { data, error } = await supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading book cover:', error);
    return { url: null, error };
  }
}

// Upload book PDF file
export async function uploadBookFile(file, fileName) {
  try {
    const { data, error } = await supabase.storage
      .from(BOOK_FILES_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Generate a signed URL that expires in 1 hour
    const { data: { signedUrl } } = await supabase.storage
      .from(BOOK_FILES_BUCKET)
      .createSignedUrl(fileName, 3600);

    return { url: signedUrl, error: null };
  } catch (error) {
    console.error('Error uploading book file:', error);
    return { url: null, error };
  }
}

// Delete book cover image
export async function deleteBookCover(fileName) {
  try {
    const { error } = await supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .remove([fileName]);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting book cover:', error);
    return { error };
  }
}

// Delete book PDF file
export async function deleteBookFile(fileName) {
  try {
    const { error } = await supabase.storage
      .from(BOOK_FILES_BUCKET)
      .remove([fileName]);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting book file:', error);
    return { error };
  }
}

// Initialize buckets when the app starts
initializeBuckets().catch(console.error);