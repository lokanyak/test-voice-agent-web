import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useKnowledgeStore } from '@/stores/knowledgeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { KnowledgeDoc } from '@/types/contracts';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { UploadCloud, FileText, Globe, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function KnowledgeBase() {
  const { documents, uploadDocument } = useKnowledgeStore();
  const [files, setFiles] = useState<File[]>([]);
  const totalStorage = 25 * 1024 * 1024; // 25MB Free Tier
  const usedStorage = documents.reduce((acc, doc) => acc + doc.size, 0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    acceptedFiles.forEach(file => {
        uploadDocument({
            title: file.name,
            size: file.size,
            type: 'file', // Simplified
            language: 'english', // Simplified
            source: 'file'
        });
    });
    toast.success(`${acceptedFiles.length} file(s) added to upload queue.`);
  }, [uploadDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const columns: ColumnDef<KnowledgeDoc>[] = [
    { accessorKey: 'title', header: 'Title' },
    { 
      accessorKey: 'size', 
      header: 'Size',
      cell: ({ row }) => `${(row.original.size / (1024 * 1024)).toFixed(2)} MB`
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ row }) => <Badge variant={row.original.status === 'indexed' ? 'default' : 'secondary'} className={row.original.status === 'indexed' ? 'bg-green-500' : ''}>{row.original.status}</Badge>
    },
    { 
      accessorKey: 'lastIndexed', 
      header: 'Last Indexed',
      cell: ({ row }) => new Date(row.original.lastIndexed).toLocaleDateString()
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Content</DropdownMenuItem>
            <DropdownMenuItem>Re-index</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
        <p className="text-muted-foreground">Upload documents and connect data sources to give your agents context.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : ''}`}>
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2">Drag & drop files here, or click to select files</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT up to 5MB each</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Crawl Website</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input placeholder="https://example.com" />
              <Button>Crawl</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={(usedStorage / totalStorage) * 100} />
            <p className="text-sm text-center">
              {(usedStorage / (1024*1024)).toFixed(2)}MB of 25MB used
            </p>
            <Button variant="outline" className="w-full">Upgrade for More Storage</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Indexed Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={documents}
            filterColumnId="title"
            filterPlaceholder="Filter by title..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
