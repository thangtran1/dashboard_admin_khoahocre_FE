#!/bin/bash

# ==========================================
# 🔹 Script: check-backend.sh
# 🔹 Mục đích: Kiểm tra kết nối đến Backend server
# ==========================================

BACKEND_URL="http://localhost:5000/api/health"

echo "🔍 Đang kiểm tra kết nối tới Backend tại: $BACKEND_URL ..."

# Gửi request GET và kiểm tra mã phản hồi HTTP
if curl -s --head --request GET "$BACKEND_URL" | grep "200 OK" > /dev/null; then
  echo "✅ Kết nối Backend thành công!"
else
  echo "❌ Không thể kết nối tới Backend. Vui lòng kiểm tra server hoặc URL."
  exit 1
fi