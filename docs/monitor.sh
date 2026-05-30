#!/bin/bash

# 📊 Script giám sát deployment
# Chạy: bash monitor.sh

DOMAIN="bepcualuat.example.com"  # ⬅️ THAY BẰNG DOMAIN THỰC
APP_DIR="$HOME/apps/BepCuaLuat"

echo "=========================================="
echo "📊 MONITOR DEPLOYMENT"
echo "=========================================="
echo ""

# ========== 1. DOCKER STATUS ==========
echo "🐳 Docker Containers:"
docker compose -f $APP_DIR/docker-compose.production.yml ps --format "table {{.Container}}\t{{.Status}}\t{{.Ports}}"

echo ""
# ========== 2. RESOURCE USAGE ==========
echo "💻 Resource Usage (App container):"
docker stats bep-cua-luat --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
# ========== 3. LOGS ==========
echo "📝 Recent App Logs (cuối 20 dòng):"
docker compose -f $APP_DIR/docker-compose.production.yml logs --tail 20 app

echo ""
# ========== 4. URL STATUS ==========
echo "🌐 URL Status:"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
if [ "$RESPONSE" == "200" ]; then
    echo "✅ https://$DOMAIN - HTTP $RESPONSE (OK)"
else
    echo "⚠️  https://$DOMAIN - HTTP $RESPONSE"
fi

echo ""
# ========== 5. NGINX STATUS ==========
echo "📋 Nginx Status:"
systemctl status nginx --no-pager | head -3

echo ""
# ========== 6. SSL CERTIFICATE ==========
echo "🔒 SSL Certificate:"
certbot certificates 2>/dev/null | grep -A 2 $DOMAIN

echo ""
# ========== 7. DISK USAGE ==========
echo "💾 Disk Usage:"
df -h | grep -E "^/dev|Filesystem"

echo ""
# ========== 8. DATABASE STATUS ==========
echo "🗄️  Database (PostgreSQL):"
docker exec bep-postgres pg_isready -U bepuser && echo "✅ Database OK" || echo "❌ Database Down"

echo ""
echo "=========================================="
echo "✅ MONITORING COMPLETE"
echo "=========================================="
