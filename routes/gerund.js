const express = require("express");
const multer = require("multer");
const passport = require("passport");
const controller = require("../controllers/gerund");
const router = express.Router();
const upload = multer();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getAll,
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.getById,
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.remove,
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
  controller.create,
);
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.updateGroupe,
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.none(),
  controller.update,
);

module.exports = router;
