# know-your-place

**Know Your Place** is a lightweight web application that allows users to search for any location and retrieve valuable geographical and contextual information using real-time data from external APIs. It presents coordinates, country details, flag, and nearby landmarks in an intuitive, user-friendly format.


# Demo Video

 (https://youtu.be/7pQLVlYoQ1c)  


# Features

- Search any place by name
- Retrieve:
  - Latitude & Longitude
  - Country name and country flag
  - Nearby landmarks (Wikipedia)
- Responsive frontend (HTML, CSS, JavaScript)
- Fully containerized with Docker
- Load-balanced across two servers using HAProxy


# Live Setup

| Component | Address |
|----------|---------|
| Web01 App | `http://web-01:8080` |
| Web02 App | `http://web-02:8081` |
| Load Balancer | `http://localhost.8082`  |


# APIs Used

-  [LocationIQ API](https://locationiq.com/)
-  [REST Countries API](https://restcountries.com/)
-  [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)


# Docker Image

- Docker Hub: [https://hub.docker.com/r/kuwisanga/knowyrplace](https://hub.docker.com/r/kuwisanga/knowyrplace)
- Image Name: `kuwisanga/knowyrplace`
- Tags: `v1`, `latest`


# Local Build Instructions

 Clone the repo:
   ```bash
   git clone https://github.com/your-username/know-your-place.git
   cd know-your-place
