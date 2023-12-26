<script>
	import FileDrop from "filedrop-svelte";

    async function uploadFile(file) {
          const name = file.name;
          const ext = (name.indexOf('.') < 0) ? "" : name.split('.').pop();
          const baseURL = "http://0.0.0.0:3000";
          const url = `${baseURL}/upload`

          function b2h(buffer) {
              return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
          }
          const FILE_HASH = b2h(await crypto.subtle.digest('SHA-256', await file.arrayBuffer())); // output: the sha256 digest hex encoded of the file

          const event = {
              content: "",
              kind: 27235,
              created_at: Math.floor(Date.now() /1000),
              tags: [
                ["u", url],
                ["method", "POST"],
                ["ext", ext],
                ["payload", FILE_HASH]
              ]
          };

          const signedEvent = await window.nostr.signEvent(event);
          const b64OfSignedEvent = btoa(JSON.stringify(signedEvent));
          const data =
              {
                method: "POST",
                headers: {
                  "Authorization": `Nostr ${b64OfSignedEvent}`,
                },
                body: file
              };

          let res = await fetch(url,data);
          let text = await res.text();

          return {
             filename: file.name,
             status: res.statusText,
             response: text,
          }
    }


	let results = [];
</script>

<FileDrop on:filedrop={async (e) => {
          results = await Promise.all(e.detail.files.accepted.map(uploadFile));
}}>
        Upload files
</FileDrop>

<h1>Results</h1>
{#each results as result}
    <p>{result.filename} - {result.status} - {result.response}</p>
{/each}
