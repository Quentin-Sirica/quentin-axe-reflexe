
CREATE POLICY "Admins can upload testimonial photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonial photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonial photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read testimonial photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'testimonials' AND public.has_role(auth.uid(), 'admin'));
