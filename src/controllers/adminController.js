import { Appointment } from "../modules/appointment.js";
import { User } from "../modules/user.js";
import { PatientHistory } from "../modules/patientHistory.js";

export const adminDashboard = async (req, res) => {
  try {
    const totalDoctors = await User.countDocuments({ role: "Doctor" });
    const totalPatients = await User.countDocuments({ role: "Patient" });
    const totalAppointments = await Appointment.countDocuments();

    // Predictive Analytics

    // 1. Most common disease this month
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0,0,0,0);

    const commonDiseaseAgg = await PatientHistory.aggregate([
      { $match: { createdAt: { $gte: currentMonth }, diagnosis: { $exists: true, $ne: "" } } },
      { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    const commonDiseaseThisMonth = commonDiseaseAgg.length > 0 ? commonDiseaseAgg[0]._id : "No data";

    // 2. Patient load forecast (upcoming appointments)
    const today = new Date();
    today.setHours(0,0,0,0);
    const patientLoadForecast = await Appointment.countDocuments({ date: { $gte: today } });

    // 3. Doctor performance trends (completed appointments per doctor)
    const doctorPerformanceTrends = await Appointment.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$doctor", completedAppointments: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "doctorInfo" } },
      { $unwind: "$doctorInfo" },
      { $project: { _id: 1, doctorName: "$doctorInfo.name", completedAppointments: 1 } },
      { $sort: { completedAppointments: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      predictiveAnalytics: {
        commonDiseaseThisMonth,
        patientLoadForecast,
        doctorPerformanceTrends
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};