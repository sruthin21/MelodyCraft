"use client";
import { useEffect, useState } from "react";
import StreamPage from "../../components/StreamPage";
import { useParams } from 'next/navigation';

interface Stream {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  spaceId: string;
}

interface StreamsResponse {
  streams: Stream[];
}

export default function Page() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams<{ spaceId: string; tag: string; item: string }>();
  const { spaceId } = params;

  function fetchStreams() {

    fetch(`/api/streams?spaceId=${spaceId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); 
        if (data.streams) {
          setStreams(data.streams); 
        } else {
          setError("No streams found");
        }
      })
      .catch((error) => {
        setError("Failed to load streams.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!spaceId) {
      return; 
    }
    fetchStreams();
    const intervalId = setInterval(fetchStreams, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [spaceId]);
  console.log(streams);
  return <StreamPage spaceId={spaceId}  />;
}
