# uploadstr-webui

![](https://img.shields.io/badge/sveltekit-vite-blue.svg?logo=svelte)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/terryyrret/uploadstr-webui/docker-image.yml)
[![GitHub Issues](https://img.shields.io/github/issues/terryyrret/uploadstr.svg)](https://github.com/terryyrret/uploadstr-webui/issues)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-GNU_AGPL_v3-blue.svg)](https://opensource.org/license/agpl-v3/)


A Web-UI that you can self-host and that can interface with a running instance of uploadstr. You can use this Web-UI to upload a file, delete a file, or view a list of files from your instance of uploadstr.
You can check out my uploadstr repo at: <https://github.com/terryyrret/uploadstr>

## Features
- Upload, delete, and view a list of files from a uploadstr service
- Docker container to easily spin up and run service

## How to setup the docker container
Here is a sample docker compose file. 

docker-compose.yml
``` yaml
version: "3"
services:
  uploadstr-webui:
    container_name: uploadstr-webui
    image: ghcr.io/terryyrret/uploadstr-webui:latest
    environment:
      - PUBLIC_BASE_URL=https://img.yrret.me
    restart: unless-stopped
```

All you need is just to set a value for the PUBLIC_BASE_URL environment variable. Set it to the base URL of the uploadstr instance you want the Web-UI to talk to.
