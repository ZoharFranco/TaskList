## Design

- models
- pages - pages
- components - components
- store - state objects
- router - routing settings

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

- Create keys and crt

```shell
openssl genrsa -out localhost.key 2048
openssl req -new -key server.key -out server.csr -config openssl.cnf
openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365 -extensions req_ext -extfile openssl.cnf
```

- Add to local machine by import crt to manager user certificate
