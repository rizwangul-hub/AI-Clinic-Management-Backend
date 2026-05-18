import { PatientHistory } from "../modules/patientHistory.js";


export const addDiagnosis =
  async (req, res) => {
    try {
      const diagnosis =
        await PatientHistory.create(
          {
            ...req.body,
            doctor:
              req.userId,
          }
        );

      res.status(201).json({
        success: true,
        diagnosis,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  export const getDiagnosisHistory = async (req, res) => {
  try {
    const patientId = req.params.id;

    const history = await PatientHistory.find({
      patient: patientId,
    })
      .populate("doctor", "name email")
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};