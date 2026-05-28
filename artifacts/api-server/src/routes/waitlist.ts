import { Router } from "express";
import { z } from "zod";
import { insertWaitlistSubscriber } from "@workspace/db/supabase-client";
import { hashIp } from "../lib/hashIp";

const router = Router();

const WaitlistSchema = z.object({
  full_name: z.string().min(1).max(200),
  company_name: z.string().max(200).optional(),
  professional_email: z.string().email().max(254),
  inquiry_type: z.string().max(50).optional(),
});

router.post("/waitlist/register", async (req, res) => {
  const parsed = WaitlistSchema.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "waitlist validation failed");
    res.status(400).json({ success: false, error: "Invalid submission" });
    return;
  }

  const ipHash = hashIp(req.headers["x-forwarded-for"] as string | undefined);

  const result = await insertWaitlistSubscriber({
    full_name: parsed.data.full_name,
    company_name: parsed.data.company_name,
    professional_email: parsed.data.professional_email,
    inquiry_type: parsed.data.inquiry_type || "General",
  });

  if (!result.success) {
    if (result.reason === "EMAIL_EXISTS") {
      res.status(409).json({ success: false, error: "This email is already registered." });
      return;
    }
    req.log.error({ reason: result.reason, detail: result.detail }, "waitlist insert failed");
    res.status(500).json({ success: false, error: "Server error. Please try again later." });
    return;
  }

  req.log.info({ id: result.id, ipHash }, "waitlist subscriber registered");
  res.status(201).json({ success: true, id: result.id });
});

export default router;
