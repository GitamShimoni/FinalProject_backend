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
      contractorId: newContractor._id,
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

//A METHOD THAT DELETES A GIVEN CONTRACTOR BY CONTRACTORID
const deleteContractor = async (req, res) => {
  try {
    const { contractorId } = req.body;
    const deletedContractor = await Contractor.findByIdAndDelete(contractorId);
    res.status(202).json(deletedContractor);
  } catch {
    res.status(500).json("Couldn't delete the given contractor");
  } 
};

//A METHOD THAT ADDS A SERVICE TO A CONTRACTOR
const addServiceToContractor = async (req, res) => {
  try {
    const { contractorId, section, sectionName, unit, price } = req.body;
    const newService = await Service.create({
      section,
      sectionName,
      unit,
      price,
      contractorId: contractorId,
    });
    const updatedContractor = await Contractor.findByIdAndUpdate(
      contractorId,
      { $push: { services: { _id: newService._id } } },
      { new: true }
    );
    res.status(201).json(updatedContractor);
  } catch {
    res.status(500).json("Couldn't add the given contractor");
  }
};

//A METHOD THAT EDITS A CONTRACORS SERVICE BY GIVEN CREDENTIALS

const editContractorService = async (req, res) => {
  try {
    const { serviceId, section, sectionName, unit, price } = req.body;
    const updatedService = await Service.findByIdAndUpdate(serviceId, {
      section: section,
      sectionName: sectionName,
      unit: unit,
      price: price,
    });
    const contractorId = updatedService;
    // const updatedContractor = await Contractor.findByIdAndUpdate(
    //   contractorId,
    //   { $push: { services: { _id: newService._id } } },
    //   { new: true }
    // );
    res.status(202).json(updatedService);
  } catch {
    res.status(500).json("Couldn't edit the given service");
  }
};

//GETS A SERVICE ID, DELETES IT AND REMOVES IT FROM ITS CONTRACTOR
const deleteContractorService = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const deletedService = await Service.findByIdAndDelete(serviceId);
    const contractorId = deletedService.contractorId;
    const updatedContractor = await Contractor.findByIdAndUpdate(
      contractorId,
      { $pull: { services: { $in: serviceId } } },
      { new: true }
    );
    res.status(202).json(updatedContractor);
  } catch {
    res.status(500).json("Couldn't delete the given service");
  }
};

module.exports = {
  createContractor,
  deleteContractor,
  editContractorService,
  addServiceToContractor,
  deleteContractorService,
};

//   name: {type: String},
//   contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
//   services:[{ type: mongoose.Types.ObjectId, ref: "Service"}]
