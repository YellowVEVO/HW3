const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    index: true 
  },
  imageUrl: {
    type: String, 
    required: true
  },
  releaseDate: { 
    type: Number, 
    min: [1900, 'Must be ≥ 1900'], 
    max: [2100, 'Must be ≤ 2100'], 
    required: true
  },
  genre: { 
    type: String, 
    enum: [
      'Action','Adventure','Comedy','Drama','Fantasy',
      'Horror','Mystery','Thriller','Western','Science Fiction'
    ],
    required: true
  },
  actors: [
    {
      actorName:    { type: String, required: true },
      characterName:{ type: String, required: true }
    }
  ],
  // ← new: array of reviews
  reviews: [
    {
      userId:  { type: String, required: true },
      rating:  { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      _id:     false
    }
  ]
});

module.exports = mongoose.model('Movie', MovieSchema);
