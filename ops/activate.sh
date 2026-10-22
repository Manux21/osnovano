#!/usr/bin/env bash
set -euo pipefail

release="${1:?Provide a release ID}"
[[ "$release" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]]
base=/srv/osnovano
exec 9>"$base/deploy.lock"
flock -n 9 || { echo 'Another deployment is running' >&2; exit 1; }

incoming="$base/releases/.incoming-$release"
destination="$base/releases/$release"
test -f "$incoming/server/index.mjs"
test ! -e "$destination"
previous="$(readlink -f "$base/current" || true)"
mv "$incoming" "$destination"
ln -s "$destination" "$base/.current-$release"
mv -Tf "$base/.current-$release" "$base/current"

healthy() {
    for attempt in {1..30}; do
        if curl --fail --silent --max-time 2 http://127.0.0.1:3000/api/health | grep -q '"status":"ok"'; then
            return 0
        fi
        sleep 1
    done
    return 1
}

if sudo -n /usr/bin/systemctl restart osnovano.service && healthy; then
    echo "Deployed $release"
else
    echo 'Health check failed; restoring the previous release' >&2
    if [[ -n "$previous" && -d "$previous" ]]; then
        ln -s "$previous" "$base/.rollback-$release"
        mv -Tf "$base/.rollback-$release" "$base/current"
        sudo -n /usr/bin/systemctl restart osnovano.service
        healthy || echo 'The previous release also failed its health check' >&2
    else
        rm -f "$base/current"
    fi
    exit 1
fi

# Keep five successful releases, including the current and previous release.
mapfile -t releases < <(find "$base/releases" -mindepth 1 -maxdepth 1 -type d ! -name '.*' -printf '%T@ %f\n' | sort -rn | awk '{print $2}')
for old in "${releases[@]:5}"; do
    old_path="$base/releases/$old"
    if [[ "$old_path" != "$destination" && "$old_path" != "$previous" ]]; then
        rm -rf -- "$old_path"
    fi
done
