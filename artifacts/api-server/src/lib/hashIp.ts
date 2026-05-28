import crypto from "crypto";

export function hashIp(rawIp: string | undefined): string {
  if (!rawIp || typeof rawIp !== "string") {
    return "unknown";
  }
  const cleanIp = rawIp.split(":")[0];
  const salt = process.env.IP_HASH_SALT ?? "";
  return crypto.createHash("sha256").update(cleanIp + salt).digest("hex");
}
