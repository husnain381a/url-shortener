import supabase from "../db/supabase.js";

export async function getClicksForUrls(urlIds) {
    //fetching clicks for urls in array
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds)

  if (error) {
    console.log(error.message);
    throw new Error("Unable to load Clicks");
  }

  return data;
}
