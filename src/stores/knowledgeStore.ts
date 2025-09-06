import create from 'zustand';
import { KnowledgeDoc } from '@/types/contracts';

const initialDocs: KnowledgeDoc[] = [
    { id: 'doc-1', title: 'Hotel-Rates-2025.pdf', size: 2.5 * 1024 * 1024, type: 'pdf', language: 'english', status: 'indexed', lastIndexed: new Date(), source: 'file' },
    { id: 'doc-2', title: 'Restaurant-Menu.docx', size: 1.2 * 1024 * 1024, type: 'doc', language: 'english', status: 'processing', lastIndexed: new Date(), source: 'file' },
];

interface KnowledgeState {
  documents: KnowledgeDoc[];
  uploadDocument: (doc: Omit<KnowledgeDoc, 'id' | 'status' | 'lastIndexed'>) => void;
}

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  documents: initialDocs,
  uploadDocument: (doc) => set((state) => {
    const newDoc: KnowledgeDoc = {
      ...doc,
      id: `doc-${state.documents.length + 1}`,
      status: 'processing',
      lastIndexed: new Date(),
    };
    return { documents: [...state.documents, newDoc] };
  }),
}));
