#!/bin/bash

# 🛠️  Script setup SSH key & connect để EC2
# Chạy: bash setup-ssh.sh

echo "=========================================="
echo "🔑 SETUP SSH KEY cho AWS EC2"
echo "=========================================="

KEY_FILE="botff.pem"
EC2_HOST="admin@ec2-13-229-197-91.ap-southeast-1.compute.amazonaws.com"

# ========== 1. KIỂM TRA FILE KEY ==========
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ File $KEY_FILE không tìm thấy"
    exit 1
fi

echo "✅ Tìm thấy key file: $KEY_FILE"

# ========== 2. SET PERMISSIONS ==========
echo "🔒 Thiết lập quyền file key..."
chmod 400 "$KEY_FILE"
ls -la "$KEY_FILE" | awk '{print $1, $9}'

# ========== 3. TEST CONNECTION ==========
echo ""
echo "🔗 Kiểm tra kết nối SSH..."
echo "Lệnh: ssh -i \"$KEY_FILE\" $EC2_HOST"
echo ""

# SSH to EC2
ssh -i "$KEY_FILE" "$EC2_HOST" << 'EOSSH'

echo "✅ Kết nối SSH thành công!"
echo ""
echo "========== 📋 THÔNG TIN EC2 =========="
echo "Hostname: $(hostname)"
echo "OS: $(lsb_release -d | cut -f2)"
echo "Kernel: $(uname -r)"
echo "IP: $(hostname -I)"
echo "CPU: $(nproc) cores"
echo "RAM: $(free -h | awk '/^Mem/ {print $2}')"
echo ""
echo "=========================================="
echo ""
echo "Bây giờ bạn có thể:"
echo "  1. Deploy app: bash docs/deploy.sh"
echo "  2. Check logs: docker compose logs -f app"
echo "  3. SSH lại: ssh -i 'botff.pem' $SSH_CLIENT | cut -d' ' -f1"
echo ""

EOSSH

echo ""
echo "=========================================="
echo "✅ SSH SETUP HOÀN THÀNH"
echo "=========================================="
