import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Search } from "lucide-react";
import type { Paper, Journal } from "../../../shared/shema";

const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function Dashboard() {
  const { toast } = useToast();
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const wikidataPapers = useQuery<Paper[]>({
    queryKey: ['/api/wikidata/papers'],
  });

  const wikidataJournals = useQuery<Journal[]>({
    queryKey: ['/api/wikidata/journals'],
  });

  const scholarPapers = useQuery<Paper[]>({
    queryKey: ['/api/scholar/search', form.watch('query')],
    enabled: false,
  });

  async function onSubmit(data: SearchFormData) {
    try {
      await scholarPapers.refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search papers",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Chemistry Academic Data Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Wikidata Papers</CardTitle>
            <CardDescription>Chemistry papers from Wikidata</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {wikidataPapers.data?.map((paper) => (
                <div key={paper.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold">{paper.title}</h3>
                  <p className="text-sm text-gray-600">{paper.abstract}</p>
                  {paper.doi && (
                    <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" 
                       className="text-sm text-blue-500 hover:underline mt-2 block">
                      DOI: {paper.doi}
                    </a>
                  )}
                </div>
              ))}
              {wikidataPapers.isLoading && <div>Loading papers...</div>}
              {wikidataPapers.isError && <div>Error loading papers</div>}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chemistry Journals</CardTitle>
            <CardDescription>Academic journals in chemistry</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {wikidataJournals.data?.map((journal) => (
                <div key={journal.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold">{journal.name}</h3>
                  <p className="text-sm text-gray-600">
                    Publisher: {journal.publisher}
                    {journal.impactFactor && ` • Impact Factor: ${journal.impactFactor}`}
                  </p>
                </div>
              ))}
              {wikidataJournals.isLoading && <div>Loading journals...</div>}
              {wikidataJournals.isError && <div>Error loading journals</div>}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Google Scholar Search</CardTitle>
          <CardDescription>Search for chemistry papers</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Search Query</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter search terms..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8" disabled={scholarPapers.isLoading}>
                <Search className="w-4 h-4 mr-2" />
                {scholarPapers.isLoading ? 'Searching...' : 'Search'}
              </Button>
            </form>
          </Form>

          <ScrollArea className="h-[400px] mt-4">
            {scholarPapers.data?.map((paper) => (
              <div key={paper.id} className="mb-4 p-4 border rounded">
                <h3 className="font-semibold">{paper.title}</h3>
                <p className="text-sm text-gray-600">{paper.abstract}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Citations: {paper.citations}
                  {paper.url && (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer" 
                       className="ml-2 text-blue-500 hover:underline">
                      View Paper
                    </a>
                  )}
                </p>
              </div>
            ))}
            {scholarPapers.isError && <div>Error searching papers</div>}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}