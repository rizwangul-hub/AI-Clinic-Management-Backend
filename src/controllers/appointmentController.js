import { Appointment } from "../modules/appointment.js";


export const bookAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.create(
          {
            ...req.body,
            bookedBy:
              req.userId,
          }
        );

      res.status(201).json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const cancelAppointment =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "cancelled",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const updateAppointmentStatus =
  async (req, res) => {
    try {
      const appointment =
        await Appointment.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        appointment,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const doctorSchedule =
  async (req, res) => {
    try {
      const appointments =
        await Appointment.find(
          {
            doctor:
              req.userId,
          }
        ).populate(
          "patient"
        );

      res.json({
        success: true,
        appointments,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate("patient")
      .populate("doctor");
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};