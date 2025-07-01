router.get('/', async (req, res) => {
  try {
    console.log("Received GET request to /api/properties");
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(" Error in /api/properties:", err.message);
    res.status(500).send('Server Error');
  }
});
