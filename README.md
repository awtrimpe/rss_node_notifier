## Deployment

1. Update etc/rss_node_notifier.service with the proper path (WorkingDirectory) to the location you have placed the dashboard
1. Copy rss_node_notifier.service to /etc/systemd/system/
1. Run systemctl enable rss_node_notifier.service
1. Run systemctl start rss_node_notifier.service
