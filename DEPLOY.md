# Deploying to your own Supabase + VM

## 1. Supabase (one time)

1. Create a free project at <https://supabase.com>.
2. Copy `.env.example` to `.env` and fill it in:
   - **Project Settings → API keys**: the URL, the publishable key (`sb_publishable_…`) and the secret key (`sb_secret_…`).
   - **Connect → Session pooler**: the connection string, as `DATABASE_URL`.
3. Create the tables, storage bucket and access rules:
   ```sh
   npm install
   npm run db:migrate
   ```
4. Create the publisher login (prints the username and password; pass a password as an argument to choose your own, or run it again to reset it):
   ```sh
   node --env-file=.env scripts/create-publisher.mjs
   ```
5. Optional but recommended: **Authentication → Sign In / Providers → turn off "Allow new users to sign up"**. The database already refuses any other account; this just stops the attempts earlier.

## 2. VM (Ubuntu example)

```sh
# Node 22+
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs git
sudo git clone https://github.com/abhimnc/drishti-website.git /opt/drishti && cd /opt/drishti
sudo cp /path/to/your/.env .env        # same .env as above; DATABASE_URL and SUPABASE_SECRET_KEY can be left out on the VM
sudo npm install && sudo npm run build       # VITE_* values are baked in here, so .env must exist first
```

Run it as a service — `/etc/systemd/system/drishti.service`:

```ini
[Unit]
Description=Drishti website
After=network.target

[Service]
WorkingDirectory=/opt/drishti
ExecStart=/usr/bin/npm start
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

```sh
sudo systemctl daemon-reload && sudo systemctl enable --now drishti
```

HTTPS with Caddy (point your domain's DNS A record at the VM first) — `/etc/caddy/Caddyfile`:

```
yourdomain.com {
    reverse_proxy localhost:3000
}
```

```sh
sudo apt-get install -y caddy && sudo systemctl reload caddy
```

## Updating the site

```sh
cd /opt/drishti && sudo git pull && sudo npm install && sudo npm run build && sudo systemctl restart drishti
```
