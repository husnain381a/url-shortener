import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "@/components/Error";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import useFetch from "../hooks/useFetch"
import { UrlState } from "../context";
import { getUrls } from "../db/apiUrls";
import { getClicksForUrls } from "../db/apiClicks"
import LinkCard from "../components/LinkCard";
import CreateLink from "../components/CreateLink";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Get user from context
  const { user, isAuthenticated } = UrlState()

  // For URLs - pass directly to the function call
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls)

  // For clicks 
  const {
    loading: loadingClicks,
    error: clicksError,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksForUrls);

  // Fetch URLs when component mounts and user is available
  useEffect(() => {
    if (user?.id) {
      fnUrls(user.id);
    }
  }, [user?.id]);

  // Fetch clicks when URLs are loaded
  useEffect(() => {
    if (urls && urls.length > 0) {
      const urlIds = urls.map((url) => url.id).filter(id => id !== undefined);
      if (urlIds.length > 0) {
        fnClicks(urlIds);
      }
    }
  }, [urls]);

  // Search query filter
  const filteredUrls = urls?.filter((url) =>
    url.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalLinks = urls?.length || 0;
  const totalClicks = clicks?.length || 0;

  // Show loading if not authenticated
  if (!isAuthenticated) {
    return <div className="text-center">Please log in to access your dashboard.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && <BarLoader width={"100%"} color="#fbbf24" />}

      <div className="grid grid-cols-2 gap-4 m-5">
        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{totalLinks}</p>
          </CardContent>
        </Card>

        {/* Clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{totalClicks}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between m-5">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative m-5">
        <Input
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>

      {/* Show errors */}
      {error && <Error message={error.message} />}
      {clicksError && <Error message={clicksError.message} />}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      })}

      

    </div>
  )
}

export default Dashboard