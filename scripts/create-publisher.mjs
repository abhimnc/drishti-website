// Creates (or resets the password of) the single publisher account.
// Usage: node --env-file=.env scripts/create-publisher.mjs [password]
// Needs SUPABASE_URL and SUPABASE_SECRET_KEY (Supabase → Project Settings → API keys → secret key).
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const USERNAME = "drishtikalra";
const email = `${USERNAME}@publisher.invalid`;
const { SUPABASE_URL: url, SUPABASE_SECRET_KEY: key } = process.env;
if (!url || !key) throw new Error("Set SUPABASE_URL and SUPABASE_SECRET_KEY");

const password = process.argv[2] ?? randomBytes(15).toString("base64url");
const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  .auth.admin;
const { data, error } = await admin.listUsers({ perPage: 1000 });
if (error) throw error;
const existing = data.users.find((u) => u.email === email);
const result = existing
  ? await admin.updateUserById(existing.id, { password })
  : await admin.createUser({ email, password, email_confirm: true });
if (result.error) throw result.error;
console.log(
  `${existing ? "Password reset" : "Created"} — username: ${USERNAME}  password: ${password}`,
);
