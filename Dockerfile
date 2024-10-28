# Sử dụng Node.js image để build
FROM node:23 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY dist/package*.json ./

# Cài đặt thư viện chỉ cho môi trường sản xuất
RUN npm install --omit=dev

# Sao chép mã nguồn vào container
COPY dist .

# Tạo một bước build tối giản để giảm kích thước ảnh
FROM node:23-alpine AS production

COPY --from=build /app ./app

# Thiết lập lệnh khởi chạy
CMD ["node", "app/index.js"]