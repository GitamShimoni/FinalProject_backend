const EndDayForm = require("../Models/EndDayForm");
const EndDaySummary = require("../Models/EndDaySummary");

const getAllFormContractors = async (req, res) => {
  const projectId = req.header("projectId");
  try {
    const allContractors = await EndDaySummary.findById(projectId).populate(
      "contractorForms"
    );
    res.status(201).json(allContractors);
  } catch {
    res.status(500).send("Get Failed");
  }
};


const createContractorForm = async (req, res) => {
    try {
        const { whatWasDone, employeeNum, status, contractSection, unitOfMeasurement, quantity, contractorId } = req.body;
        
        const projectId = req.header("projectId");
        
        const newContractorForm = await EndDayForm.create({
            whatWasDone,
            employeeNum,
            status,
            contractSection,
            unitOfMeasurement,
            quantity,
            contractorId,
        });
        
      const endDaySummary = await EndDaySummary.findOne({ projectId });
  
      endDaySummary.contractorForms.push(newContractorForm._id);
  
      await endDaySummary.save();
      
      res.status(201).json({ message: "Form created successfully", form: newContractorForm });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the form" });
    }
};

// const getAllServicesByContractorId = async (req, res) => {
//   const contractorId = req.body.contractorId;

//   try {
//     const allServices = await Contractor.findById(contractorId).populate(
//       "services"
//     );
//     res.status(201).json(allServices.services);
//   } catch {
//     res.status(500).send("Get Failed");
//   }
// };





















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



module.exports = {
//   editContractorService,
//   addServiceToContractor, 
//   getAllServicesByContractorId,
//   addServiceArrToContractor,
  getAllFormContractors,
  createContractorForm 
};
