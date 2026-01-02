import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';
import { getServerNoteById } from '@/lib/api/serverApi';

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewModal({ params }: PreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
