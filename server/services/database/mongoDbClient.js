import mongoose from "mongoose";
const { connect } = mongoose;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoDbClient = {
  initialize: async () => {
    try {
      await mongoose.connect(process.env.BDD_URI, options).then(() => {
        console.log("Successful connected to database");
      });
    } catch (error) {
      throw new Error(ReferenceError);
    }
  },
};

export default mongoDbClient;
