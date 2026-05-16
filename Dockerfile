# Python tabanlı resmi imaj
FROM python:3.10-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tüm projeyi kopyala
COPY . .

# Çalışma dizinini backend'e çek
WORKDIR /app/backend

# Çevresel değişken
ENV PORT 8000

# Uygulamayı başlat
CMD ["sh", "-c", "uvicorn api_main:app --host 0.0.0.0 --port $PORT"]
