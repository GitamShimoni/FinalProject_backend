const Contractor = require("../Models/contractor");
const Service = require("../Models/service");

const createContractor = async (req, res) => {
  try {
    //SHOULD ADD A PROJECT KEY HEADER, FIND THE PROJECT AND ADD THE UPDATED CONTRACTOR TO THE PROJECT
    const { name, section, sectionName, unit, price } = req.body;

    //CREATE NEW CONTRACTOR
    const newContractor = await Contractor.create({
      name: name,
    });
    //CREATE A NEW SERVICE WITH THE CONTRACTOR ID
    const newService = await Service.create({
      section,
      sectionName,
      unit,
      price,
      contractor_id: newContractor._id,
    });

    //INSERT THE NEW SERVICE TO THE NEW CONTRACTOR
    const updatedContractor = await Contractor.findByIdAndUpdate(
      newContractor._id,
      { $push: { services: { _id: newService._id } } },
      { new: true }
    );
    res.status(201).json(updatedContractor);
  } catch {
    res.status(401).send("Couldnt make contractor");
  }
};

const addServiceToConstractor = async (req, res) => {};

module.exports = { createContractor, addServiceToConstractor };

//   name: {type: String},
//   contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
//   services:[{ type: mongoose.Types.ObjectId, ref: "Service"}]
