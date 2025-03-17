const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if the connection fails (optional)
  }
};

connectDB();

// Movie schema
var MovieSchema = new Schema({
  title: { type: String, required: true, index: true },
  imageUrl: {
    type: String, required: true
  },
  releaseDate: { 
      type: Number, 
      min: [1900, 'Must be greater than 1899'], 
      max: [2100, 'Must be less than 2100'], 
      required: true
  },
  genre: { 
      type: String, 
      enum: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western', 'Science Fiction'],
      required: true
  },
  actors: [
      {
          actorName: { type: String, required: true },
          characterName: { type: String, required: true }
      }
  ]
});

module.exports = mongoose.model('Movie', MovieSchema);