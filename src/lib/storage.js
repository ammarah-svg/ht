import { supabase } from './supabase';

// Storage bucket names
const BOOK_COVERS_BUCKET = 'book-covers';
const BOOK_FILES_BUCKET = 'book-files';

// Initialize storage buckets if they don't exist
async function initializeBuckets() {
  try {
    // Check if buckets exist first, authentication not required for initialization
    const { data: { user } } = await supabase.auth.getUser();

    const { data: buckets, error } = await supabase.storage.listBuckets();
    // If bucket not found error, we'll create them
    if (error && error.message.includes('bucket-not-found')) {
      // Create book covers bucket
      const { error: coverError } = await supabase.storage.createBucket(BOOK_COVERS_BUCKET, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });
      if (coverError && !coverError.message.includes('already exists')) throw coverError;

      // Create book files bucket
      const { error: fileError } = await supabase.storage.createBucket(BOOK_FILES_BUCKET, {
        public: false,
        fileSizeLimit: 104857600, // 100MB
        allowedMimeTypes: ['application/pdf']
      });
      if (fileError && !fileError.message.includes('already exists')) throw fileError;

      return;
    }
    if (error) throw error;

    // If buckets exist, check if our required buckets exist
    if (!buckets?.find(b => b.name === BOOK_COVERS_BUCKET)) {
      const { error: createError } = await supabase.storage.createBucket(BOOK_COVERS_BUCKET, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      });
      if (createError && !createError.message.includes('already exists')) throw createError;
    }

    if (!buckets?.find(b => b.name === BOOK_FILES_BUCKET)) {
      const { error: createError } = await supabase.storage.createBucket(BOOK_FILES_BUCKET, {
        public: false,
        fileSizeLimit: 104857600, // 100MB
        allowedMimeTypes: ['application/pdf']
      });
      if (createError && !createError.message.includes('already exists')) throw createError;
    }
  } catch (error) {
    console.error('Error initializing buckets:', error);
    throw error;
  }
}

// Upload book cover image
export async function uploadBookCover(file, fileName) {
  try {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed');
    }

    const { data, error } = await supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      if (error.message.includes('storage/bucket-not-found')) {
        await initializeBuckets();
        return uploadBookCover(file, fileName);
      }
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BOOK_COVERS_BUCKET)
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading book cover:', error);
    return { 
      url: null, 
      error: error.message || 'Failed to upload book cover'
    };
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