## Design

- controllers
    - taskController - task management based on dal
    - userController - users management based on dal
- dal
    - users dal
- logger - basic logger of api requests
- models
- routes
    - requests - format of requests
    - authRoutes - routes for auth operations
    - taskRoutes - routes for tasks operations
    - generalRoutes - routes for general use (alive sign)
- utils

## How to use

### Setup

```sh
npm install
```

### Run

```shell
npm run start
```

### Debug

```shell
npm run debug
```

### Test

```shell
npm run test
```

### Swagger

- The swagger is configured in .\src\utils\swaggerUtils\swagger-config.json
- For every endpoint:
    - default input
    - output statuses (if I had time - output objects also)

- In order to auto-generate the swagger:

```shell
npx ts-node .\utils\swaggerUtils\swaggerConfigGenerator.ts
```

### HTTPS

for dev this is the process (when use production should be in outer authority)

- Create keys and crt

```shell
openssl genrsa -out localhost.key 2048
openssl req -new -key server.key -out server.csr -config openssl.cnf
openssl x509 -req -in server.csr -signkey server.key -out server.crt -days 365 -extensions req_ext -extfile openssl.cnf
```

- Add to local machine by import crt to manager user certificate