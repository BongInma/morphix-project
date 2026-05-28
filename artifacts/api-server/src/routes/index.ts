import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import waitlistRouter from "./waitlist";
import telemetryRouter from "./telemetry";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(waitlistRouter);
router.use(telemetryRouter);

export default router;
