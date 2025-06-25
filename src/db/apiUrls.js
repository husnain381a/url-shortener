import { UAParser } from "ua-parser-js";
import supabase from "../db/supabase.js";

//for url fetching
export async function getUrls(user_id) {
  //fetching urls
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load URLs");
  }

  return data;
}

//for url deletion
export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}

//create new url
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const finalShortUrl = customUrl || short_url;
  const fileName = `qr-${finalShortUrl}`;

  // 1. Check if custom_url is already taken
  if (customUrl) {
    const { data: existingUrl } = await supabase
      .from("urls")
      .select("id")
      .eq("custom_url", customUrl)
      .maybeSingle();

    if (existingUrl) {
      throw new Error("This custom URL is already taken. Please choose another.");
    }
  }

  // 2. Upload QR code
  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  // 3. Inserting URL in db
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: finalShortUrl,
        user_id,
        short_url: finalShortUrl,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}


//for fetching long url, for url redirection
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .limit(1)
    .single();

  if (error || !data) {
    console.error("Supabase error:", error);
    throw new Error("Unable to fetch Url");
  }

  return data;
}

//stats for user and redirection
//install lib - ua parser
//storing clicks of the short url, and redirecting it to original link
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const parser = new UAParser();
    const res = parser.getResult(); //get dev info
    const device = res.device?.type || "desktop";

    let city = "Unknown",
      country = "Unknown";

    try {
      const response = await fetch("https://ipinfo.io/json?token=53a9561f25540f"); //get country and city
      const location = await response.json();

      city = location.city || "Unknown";
      country = location.country || "Unknown";
    } catch (locationError) {
      console.warn("Failed to get location:", locationError.message);
    }

    await supabase.from("clicks").insert({ //put into db
      url_id: id,
      city,
      country,
      device,
    });

    window.location.href = originalUrl; //redirect
  } catch (error) {
    console.error("Click tracking error:", error.message);
    window.location.href = originalUrl; // still redirect even if tracking fails
  }
};


//for link comp - for getting url, which we click
export async function getUrl({id, user_id}) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single()

  if (error || !data) {
    throw new Error("Get Url Error");
  }

  return data;
}

//for seeing stats / click of that particular url
export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id)

  if (error || !data) {
    throw new Error("Unable to load stats");
  }

  return data;
}