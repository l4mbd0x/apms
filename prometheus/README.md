# comp-apm
Competição 2023 entre soluções de APM (Application Performance Monitoring) para supervisionar os containers do Tiflux

- Docker + Prometheus + Grafana (dpg):
  - Features:
    - Prometheus monitores host (w/ node-exporter) and containers (w/ cadvisor)
  - Technical aspects:
    - Prometheus:
      - Service is on port 9090 
    - Grafana:
      - Service is on port 3000
      - usu/pass: admin/test123
      - Data source: add Prometheus as data source and configure it with the address: http://prometheus:9090 and click on test and confirm it.
      - dashboard: Hover your mouse on Dashboard menu, a dropdown menu will open, there hover to import, insert the code 11600 and press look. There it will show the details of the dashboard. On the bottom there will be an option to insert which data source to use. Put Prometheus there and confirm.
  - How to use it:
    - 1) Pull this repo to airbyte on port host
    - 2) Copy the contents of this repo into airbyte, which will replace docker-compose with the edited one allowing docker to also service prometheus and grafana 