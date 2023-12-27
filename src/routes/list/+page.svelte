<script>
    async function getFiles() {
          const baseURL = "http://0.0.0.0:3000";
          const url = `${baseURL}/list`
          const event = {
              content: "",
              kind: 27235,
              created_at: Math.floor(Date.now() /1000),
              tags: [
                ["u", url],
                ["method", "GET"],
              ]
          };
          const signedEvent = await window.nostr.signEvent(event);
          const b64OfSignedEvent = btoa(JSON.stringify(signedEvent));
          const data =
              {
                method: "GET",
                headers: {
                  "Authorization": `Nostr ${b64OfSignedEvent}`,
                }
              };

          let res = await fetch(url,data);
          let text = await res.text();
        try {
            urls = JSON.parse(text);
            error = null;
        } catch(e) {
            urls = null;
            error = text;
        }
    }

    let urls = null;
    let error = null;
</script>

<button on:click={getFiles}>Get list of files.</button>


{#if error}
    <h1>Error</h1>
    <p>{error}</p>
{/if}

{#if urls}
    <h1>List of files on server</h1>
    <ul>
        {#each urls as url}
            <li><a href={url}>{url}</a></li>
        {/each}
    </ul>
{/if}
