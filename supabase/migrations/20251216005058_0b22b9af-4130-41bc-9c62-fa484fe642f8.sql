-- Create storage bucket for book cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('book-covers', 'book-covers', true);

-- Allow anyone to read cover images (public bucket)
CREATE POLICY "Public can view book covers"
ON storage.objects
FOR SELECT
USING (bucket_id = 'book-covers');

-- Allow authenticated users to upload cover images
CREATE POLICY "Users can upload book covers"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'book-covers');

-- Allow users to update their uploaded covers
CREATE POLICY "Users can update book covers"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'book-covers');

-- Allow users to delete their covers
CREATE POLICY "Users can delete book covers"
ON storage.objects
FOR DELETE
USING (bucket_id = 'book-covers');