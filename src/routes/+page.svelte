<script>
	import FileDrop from "filedrop-svelte";
	let files = null;
</script>

<FileDrop on:filedrop={(e) => {
          console.log(e);
          files = e.detail.files;

          let file = files.accepted[0];
          let name = file.name;
          let ext = name.split('.').pop();

          let url = (ext === name) ?
              "http://0.0.0.0:3000/upload"
              :
              `http://0.0.0.0:3000/upload/${ext}`

          fetch(
              url,
              {
                method: "POST",
                mode: "no-cors",
                body: files.accepted[0]
              }
          ).then((response) => {
            console.log(response);
          }).catch((e) => {
            console.log(e);
            });
}}>
        Upload files
</FileDrop>

{#if files}
	<h3>Accepted files</h3>
	<ul>
		{#each files.accepted as file}
			<li>{file.name}</li>
		{/each}
	</ul>
	<h3>Rejected files</h3>
	<ul>
		{#each files.rejected as rejected}
			<li>{rejected.file.name} - {rejected.error.message}</li>
		{/each}
	</ul>
{/if}
