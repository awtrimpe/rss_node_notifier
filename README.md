# RSS Node Notifier

A lightweight NodeJS RSS notifier written in TypeScript.

The purpose of this project is to create a self-hosted, routine service that can check RSS feeds for updates and plug into notification services for alerting of important changes. This project differs from an RSS reader in that it serves the purpose of kicking off an action only after the defined rules have been met, rather than collecting content to be read by the user at a later time.

## Deployment

#### Option 1: Local server install (assumes Node/NPM are available locally)

1. Copy/clone the repository to the server
1. Run `npm install --omit=dev`
1. Update etc/rss_node_notifier.service with the proper path (WorkingDirectory) to the location you have placed the dashboard
1. Copy rss_node_notifier.service to /etc/systemd/system/
1. Run systemctl enable rss_node_notifier.service
1. Run systemctl start rss_node_notifier.service

#### Opition 2: Docker/Podman

1. TBD
