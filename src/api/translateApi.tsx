export const TranslateApi = async () => 
{
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: "hello",
            source: "auto",
            target: "cs",
            format: "text",
            alternatives: 3,
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    console.log(data);

}