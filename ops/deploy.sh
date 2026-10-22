#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?Set DEPLOY_HOST}"
: "${DEPLOY_USER:?Set DEPLOY_USER}"
: "${DEPLOY_SSH_KEY:?Set DEPLOY_SSH_KEY}"
: "${DEPLOY_KNOWN_HOSTS:?Set DEPLOY_KNOWN_HOSTS}"
: "${RELEASE_ID:?Set RELEASE_ID}"

[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ ]]
[[ "$DEPLOY_USER" =~ ^[a-z_][a-z0-9_-]*$ ]]
[[ "$RELEASE_ID" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]]
test -f .output/server/index.mjs

umask 077
task_ssh_dir="$(mktemp -d)"
trap 'rm -rf "$task_ssh_dir"' EXIT
printf '%s\n' "$DEPLOY_SSH_KEY" > "$task_ssh_dir/key"
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > "$task_ssh_dir/known_hosts"
ssh_options=(-i "$task_ssh_dir/key" -o BatchMode=yes -o IdentitiesOnly=yes
    -o StrictHostKeyChecking=yes -o "UserKnownHostsFile=$task_ssh_dir/known_hosts"
    -o ConnectTimeout=15)
target="$DEPLOY_USER@$DEPLOY_HOST"
staging="/srv/osnovano/releases/.incoming-$RELEASE_ID"

ssh "${ssh_options[@]}" "$target" "mkdir -p '$staging'"
rsync -az --no-owner --no-group --delete --chmod=u=rwX,g=rX,o= \
    -e "ssh -i '$task_ssh_dir/key' -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile='$task_ssh_dir/known_hosts' -o ConnectTimeout=15" \
    .output/ "$target:$staging/"
ssh "${ssh_options[@]}" "$target" "/usr/local/bin/osnovano-activate '$RELEASE_ID'"
