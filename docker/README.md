# Tạo MongoDB Replica Set

## Bước 1: Tạo Key File

Tạo một key file với một chuỗi an toàn. Sử dụng lệnh sau để tạo key file:

```bash
openssl rand -base64 756 > /path/to/mongo-keyfile
chmod 400 /path/to/mongo-keyfile
```

**Lưu ý:** Thay thế `/path/to/mongo-keyfile` bằng đường dẫn mong muốn trên hệ thống của bạn.

## Bước 2: Cập nhật Tệp `docker-compose.yml`

Mở tệp `docker-compose.yml` và đảm bảo rằng đường dẫn đến key file được chỉ định chính xác:

```yaml
version: '3.8'

services:
  mongo-primary:
    image: mongo:latest
    container_name: mongo-primary
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_INITDB_DATABASE=zm
    command: --replSet rs0 --keyFile /etc/mongo/mongo-keyfile
    volumes:
      - mongo-primary-data:/data/db
      - /path/to/mongo-keyfile:/etc/mongo/mongo-keyfile:ro

  mongo-secondary:
    image: mongo:latest
    container_name: mongo-secondary
    ports:
      - "27018:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_INITDB_DATABASE=zm
    command: --replSet rs0 --keyFile /etc/mongo/mongo-keyfile
    volumes:
      - mongo-secondary-data:/data/db
      - /path/to/mongo-keyfile:/etc/mongo/mongo-keyfile:ro

volumes:
  mongo-primary-data:
  mongo-secondary-data:
```

## Bước 3: Khởi động lại Docker Compose

Chạy các lệnh sau để tắt các container hiện tại và khởi động lại:

```bash
docker-compose down
docker-compose up -d
```

## Bước 4: Khởi tạo Replica Set

Kết nối vào instance primary và khởi tạo replica set nếu cần thiết:

```bash
docker exec -it mongo-primary mongosh -u root -p password --authenticationDatabase admin
```

Trong shell MongoDB, chạy các lệnh sau:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo-primary:27017" },
    { _id: 1, host: "mongo-secondary:27017" }
  ]
});
```
