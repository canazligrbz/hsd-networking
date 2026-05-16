# Python tabanlı resmi imaj
FROM python:3.10-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Tüm projeyi kopyala (frontend/dist dahil)
COPY . .

# Çevresel değişken (Google Cloud Run otomatik olarak PORT değişkenini atar)
ENV PORT 8000

# Uygulamayı başlat
CMD ["sh", "-c", "uvicorn api_main:app --host 0.0.0.0 --port $PORT"]
