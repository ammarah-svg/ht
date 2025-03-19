'use client';

import { useState } from 'react';
import { uploadBookCover, uploadBookFile } from '@/lib/storage';
import Toast from '@/components/ToastMessage';

export default function Dashboard() {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        coverFile: null,
        pdfFile: null
    });
    const [coverPreview, setCoverPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            if (name === 'coverFile') {
                setCoverPreview(URL.createObjectURL(files[0]));
            }
            setBookData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const coverFileName = `${Date.now()}-${bookData.coverFile.name}`;
            const { url: coverUrl, error: coverError } = await uploadBookCover(
                bookData.coverFile,
                coverFileName
            );

            if (coverError) throw new Error(coverError.message || 'Failed to upload cover image');

            const pdfFileName = `${Date.now()}-${bookData.pdfFile.name}`;
            const { url: pdfUrl, error: pdfError } = await uploadBookFile(
                bookData.pdfFile,
                pdfFileName
            );

            if (pdfError) throw new Error('Failed to upload PDF file');

            showToast('Book uploaded successfully');
            
            setBookData({
                title: '',
                author: '',
                description: '',
                coverFile: null,
                pdfFile: null
            });
            setCoverPreview('');
            
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-900">Book Dashboard</h1>
                
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" value={bookData.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="author">Author</label>
                            <input type="text" id="author" name="author" value={bookData.author} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="description">Description</label>
                            <textarea id="description" name="description" value={bookData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="4" required></textarea>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="coverFile">Cover Image</label>
                            <input type="file" id="coverFile" name="coverFile" onChange={handleFileChange} accept="image/jpeg,image/png,image/webp" className="w-full" required />
                            {coverPreview && <img src={coverPreview} alt="Cover preview" className="mt-2 w-32 h-48 object-cover rounded" />}
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="pdfFile">PDF File</label>
                            <input type="file" id="pdfFile" name="pdfFile" onChange={handleFileChange} accept="application/pdf" className="w-full" required />
                        </div>
                        
                        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300">
                            {loading ? 'Uploading...' : 'Upload Book'}
                        </button>
                    </form>
                    {toast.show && <Toast message={toast.message} type={toast.type} />}
                </div>
            </div>
        </div>
    );
}
