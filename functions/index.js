// functions/index.js
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

try {
  admin.initializeApp();
} catch (_) {
  // already initialized, ignore in hot-reload
}

exports.countBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await admin.firestore().collection("books").get();
      const count = snap.size;
      res.status(200).json({ count });
    } catch (err) {
      console.error("countBooks error:", err);
      res.status(500).json({ error: "Internal error" });
    }
  });
});
exports.capitalizeBookTitle = functions.firestore
  .document("books/{bookId}")
  .onCreate(async (snap, context) => {
    const originalData = snap.data();
    const bookName = originalData.name;
    // Convert book titles to uppercase
    const capitalized = bookName.toUpperCase();
    // Updating Firestore Documentation
    await snap.ref.update({
      name: capitalized
    });

    console.log(`Book name converted to uppercase: ${capitalized}`);
  });