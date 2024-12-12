import { useState, useEffect } from "react";
import { GetUrlUtils } from "./getUrlUtils";
import { GetTextApi } from "../api/scrapeTextApi";
import { getValData } from "../services/getDataChrome";

export const useScrapedData = () => {
  const [scrapedData, setScrapedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const url = GetUrlUtils(); // Get the active tab's URL

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        return;
      }

      setLoading(true);
      try {
        const level = await getValData("level");
        const data = await GetTextApi(url, level);
        setScrapedData(JSON.stringify(data, null, 2)); // Format data as JSON string
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { scrapedData, loading, error };
};
