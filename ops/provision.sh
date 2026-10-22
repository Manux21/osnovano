#!/usr/bin/env bash
set -euo pipefail
[[ "$(id -u)" = 0 ]]
cd "$(dirname "$0")"

id osnovano &>/dev/null || useradd --system --user-group --home-dir /var/lib/osnovano --shell /usr/sbin/nologin osnovano
id osnovano-deploy &>/dev/null || useradd --create-home --user-group --shell /bin/bash osnovano-deploy
usermod -aG osnovano osnovano-deploy
install -d -o osnovano-deploy -g osnovano -m 2750 /srv/osnovano /srv/osnovano/releases
install -d -o osnovano -g osnovano -m 0700 /var/lib/osnovano
install -d -o osnovano-deploy -g osnovano-deploy -m 0700 /home/osnovano-deploy/.ssh
install -o osnovano-deploy -g osnovano-deploy -m 0600 deploy-key.pub /home/osnovano-deploy/.ssh/authorized_keys
sed -i 's/^/restrict /' /home/osnovano-deploy/.ssh/authorized_keys

install -o root -g root -m 0755 activate.sh /usr/local/bin/osnovano-activate
printf '%s\n' 'osnovano-deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart osnovano.service' > /etc/sudoers.d/osnovano
chmod 0440 /etc/sudoers.d/osnovano
visudo -cf /etc/sudoers.d/osnovano
install -m 0644 osnovano.service /etc/systemd/system/osnovano.service
if [[ ! -f /etc/osnovano.env ]]; then
    printf '%s\n' 'NUXT_PUBLIC_SITE_URL=http://147.45.245.107' > /etc/osnovano.env
    chmod 0600 /etc/osnovano.env
fi

install -m 0644 nginx.conf /etc/nginx/sites-available/osnovano
rm -f /etc/nginx/sites-enabled/default
ln -sfn /etc/nginx/sites-available/osnovano /etc/nginx/sites-enabled/osnovano
nginx -t
systemctl daemon-reload
systemctl enable osnovano.service nginx.service
systemctl restart nginx.service
