const mongoose = require('mongoose');
const Property = require('./models/Property');

mongoose.connect('mongodb://localhost:27017/nobroker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Property.deleteMany();

  await Property.insertMany([
    {
      title: 'Spacious 2BHK in Mumbai',
      city: 'Mumbai',
      type: '2BHK',
      rent: '20000',
      description: 'Near railway station'
    },
    {
      title: 'Modern 1BHK in Pune',
      city: 'Pune',
      type: '1BHK',
      rent: '15000',
      description: 'Close to IT park'
    },
    {
      title: '3BHK Villa in Bangalore',
      city: 'Bangalore',
      type: '3BHK',
      rent: '40000',
      description: 'Private garden and parking'
    }
  ]);

  console.log('Properties seeded!');
  mongoose.disconnect();
});
