import { Appointment } from "../modules/appointment.js";
import { PatientHistory } from "../modules/patientHistory.js";
import { Prescription } from "../modules/prescription.js";
import { User } from "../modules/user.js";
import bcrypt from "bcrypt";

export const addPatient = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      age,
      gender,
      contact,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "Patient already exists",
        });
    }

    const hashpassword = await bcrypt.hash(password || "Password123!", 10);

    const patient =
      await User.create({
        name,
        email,
        password: hashpassword,
        role: "Patient",
        age,
        gender,
        contact,
      });

    res.status(201).json({
      success: true,
      patient,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

export const editPatient =
  async (req, res) => {
    try {
      const patient =
        await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        patient,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getPatientProfile =
  async (req, res) => {
    try {
      const patient =
        await User.findById(
          req.params.id
        );

      res.json({
        success: true,
        patient,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getPatientTimeline =
  async (req, res) => {
    try {
      const patientId =
        req.params.id;

      const appointments =
        await Appointment.find(
          {
            patient:
              patientId,
          }
        );

      const prescriptions =
        await Prescription.find(
          {
            patient:
              patientId,
          }
        );

      const diagnosis =
        await PatientHistory.find(
          {
            patient:
              patientId,
          }
        );

      res.json({
        appointments,
        prescriptions,
        diagnosis,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "Patient" });
    res.json({
      success: true,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};