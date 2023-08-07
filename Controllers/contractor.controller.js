const Contractor = require("../Models/contractor");
const Service = require("../Models/service");
const Project = require("../Models/project");

const getAllContractors = async (req, res) => {
  const projectId = req.header("projectId");

  try {
    const allContractors = await Project.findById(projectId).populate({
      path: "contractors",
      populate: { path: "services", model: "Service" },
    });
    res.status(201).json(allContractors);
  } catch {
    res.status(500).send("Get Failed");
  }
};

const getAllServicesByContractorId = async (req, res) => {
  const contractorId = req.body.contractorId;

  try {
    const allServices = await Contractor.findById(contractorId).populate(
      "services"
    );
    res.status(201).json(allServices.services);
  } catch {
    res.status(500).send("Get Failed");
  }
};
const createContractor = async (req, res) => {
  try {
    const { name, services } = req.body;

    const projectId = req.header("projectId");

    //CREATE NEW CONTRACTOR
    const newContractor = await Contractor.create({
      name: name,
      services: [],
    });

    // INSERT THE NEW SERVICES TO THE NEW CONTRACTOR
    for (const serviceData of services) {
      const newService = await Service.create({
        section: serviceData.section,
        sectionName: serviceData.sectionName,
        price: serviceData.price,
        contractorId: newContractor._id,
        unit: serviceData.unit,
      });
      newContractor.services.push(newService);
    }

    // SAVE THE UPDATED CONTRACTOR
    await newContractor.save();

    // FETCH THE PROJECT USING projectId
    const project = await Project.findById(projectId);
    // console.log(project, "THIS IS THE PROJECT");

    if (!project) {
      // If project with the provided projectId is not found, handle the error
      return res.status(404).json({ message: "Project not found" });
    }

    // ADD THE NEW CONTRACTOR TO THE PROJECT'S CONTRACTORS ARRAY
    project.contractors.push(newContractor);

    // SAVE THE UPDATED PROJECT WITH THE NEW CONTRACTOR
    await project.save();

    res.status(201).json(newContractor);
  } catch (error) {
    res.status(500).json({ message: "Couldn't create the contractor" });
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
    const { contractorId, section, sectionName, price, unit } = req.body;
    const newService = await Service.create({
      section,
      sectionName,
      price,
      contractorId: contractorId,
      unit,
    });
    const updatedContractor = await Contractor.findByIdAndUpdate(
      contractorId,
      { $push: { services: { _id: newService._id } } },
      { new: true }
    );
    res.status(201).json(newService);
  } catch {
    res.status(500).json("Couldn't add the given contractor");
  }
};

const addServiceArrToContractor = async (req, res) => {
  try {
    const { contractorId, services } = req.body;
    const updateContractor = await Contractor.findByIdAndUpdate(
      contractorId,
      {
        $set: { services: services },
      },
      { new: true }
    );

    res.status(201).json(updateContractor);
  } catch {
    res.status(500).json("Couldn't add the given contractor");
  }
};

//A METHOD THAT EDITS A CONTRACORS SERVICE BY GIVEN CREDENTIALS

const editContractorService = async (req, res) => {
  try {
    const { serviceId, section, sectionName, price } = req.body;
    const updatedService = await Service.findByIdAndUpdate(serviceId, {
      section: section,
      sectionName: sectionName,
      price: price,
    });
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
  getAllContractors,
  getAllServicesByContractorId,
  addServiceArrToContractor,
};

//   name: {type: String},
//   contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
//   services:[{ type: mongoose.Types.ObjectId, ref: "Service"}]
