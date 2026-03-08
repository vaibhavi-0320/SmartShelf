-- Allow users to delete their own book ownership records
CREATE POLICY "Users can delete their own book records"
ON public.user_books
FOR DELETE
USING (true);