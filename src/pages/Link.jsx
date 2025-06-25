import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { UrlState } from '../context'
import useFetch from "../hooks/useFetch"
import { getUrl } from "../db/apiUrls";
import { getClicksForUrl } from "../db/apiUrls";
import { deleteUrl } from "../db/apiUrls";
import { BarLoader, BeatLoader } from "react-spinners";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import {Button} from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Download } from "lucide-react";
import { Trash } from "lucide-react";
import LocationStats from "../components/LocationStats";
import DeviceStats from "../components/DeviceStats";


function Link() {

  const downloadImage = () => {
    if (url?.qr) {
      const link = document.createElement('a');
      link.href = url.qr;
      link.download = `${url.title || 'qr-code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();

  
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl);

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl);

  const {loading: loadingDelete, fn: fnDelete} = useFetch(deleteUrl);

  useEffect(() => {
    // Add more detailed logging to debug the issue
    console.log('useEffect triggered - user:', user, 'id:', id);
    console.log('user?.id:', user?.id);
    
    // Reset error state when dependencies change
    if (error) {
      console.log('Resetting previous error');
    }
    
    
    if (user?.id && id) {
      console.log('Making API calls with:', { id, userId: user.id });
      
      
      fn({ id, user_id: user.id });
      
      
      fnStats(id);
    } else {
      console.log('Skipping API calls - missing user or id', {
        hasUser: !!user,
        hasUserId: !!user?.id,
        hasId: !!id,
        userValue: user,
        idValue: id
      });
    }
  }, [id, user?.id]);

  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error, navigate]);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  // Show loading state
  if (loading || loadingStats) {
    return (
      <div>
        <BarLoader className="mb-4" width={"100%"} color="#fbbf24" />
        <p>Loading URL data...</p>
      </div>
    );
  }

  // Show error or no data state
  if (!url && !loading) {
    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <p className="text-lg">No URL data found or URL doesn't exist.</p>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row justify-between m-5">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          {/* Title with fallback */}
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title || 'Untitled URL'}
          </span>
          
          {/* Short URL with conditional rendering */}
          {link && (
            <a
              href={`https://trimrr.link/${link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            >
              https://trimrr.link/{link}
            </a>
          )}
          
          {/* Original URL with conditional rendering */}
          {url?.original_url && (
            <a
              href={url.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline cursor-pointer"
            >
              <ExternalLink className="p-1" />
              {url.original_url}
            </a>
          )}
          
          {/* Date with conditional rendering */}
          {url?.created_at && (
            <span className="flex items-end font-extralight text-sm">
              {new Date(url.created_at).toLocaleString()}
            </span>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                if (link) {
                  navigator.clipboard.writeText(`https://trimrr.link/${link}`)
                    .then(() => console.log('Copied to clipboard'))
                    .catch(err => console.error('Failed to copy:', err));
                }
              }}
              disabled={!link}
            >
              <Copy />
            </Button>
            <Button 
              variant="ghost" 
              onClick={downloadImage}
              disabled={!url?.qr}
            >
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete(id).then(() => {
                  navigate("/dashboard");
                })
              }
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          
          {/* QR Code with conditional rendering and error handling */}
          {url?.qr ? (
            <img
              src={url.qr}
              className="w-300 self-center sm:self-start ring ring-blue-500 p-1 object-contain"
              alt="QR code"
              onError={(e) => {
                console.error('QR code failed to load:', url.qr);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log('QR code loaded successfully')}
            />
          ) : (
            <div className="w-full h-48 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-500">No QR code available</p>
            </div>
          )}
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link