import { Prescription } from "../modules/prescription.js";
import PDFDocument from "pdfkit";

export const addPrescription =
  async (req, res) => {
    try {
      const prescription =
        await Prescription.create(
          {
            ...req.body,
            doctor:
              req.userId,
          }
        );

      res.status(201).json({
        success: true,
        prescription,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const getPatientPrescriptions =
  async (req, res) => {
    try {
      const prescriptions =
        await Prescription.find(
          {
            patient:
              req.params.id,
          }
        );

      res.json({
        prescriptions,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

export const downloadPrescriptionPDF = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("doctor", "name email")
      .populate("patient", "name email");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=prescription-${prescription._id}.pdf`
    );

    doc.pipe(res);

    // Header
    doc.fontSize(20).text("Clinic Management System", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text("Medical Prescription", { align: "center", underline: true });
    doc.moveDown();

    // Details
    doc.fontSize(12).text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Doctor: Dr. ${prescription.doctor?.name || "N/A"}`);
    doc.text(`Patient: ${prescription.patient?.name || "N/A"}`);
    doc.moveDown();

    // Medicines
    doc.fontSize(14).text("Medicines:", { underline: true });
    doc.moveDown(0.5);
    
    if (prescription.medicines && prescription.medicines.length > 0) {
      prescription.medicines.forEach((med, index) => {
        doc.fontSize(12).text(`${index + 1}. ${med.medicineName}`);
        doc.fontSize(10).text(`   Dosage: ${med.dosage} | Duration: ${med.duration}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.fontSize(12).text("No medicines prescribed.");
    }
    
    doc.moveDown();

    // Instructions
    if (prescription.instructions) {
      doc.fontSize(14).text("Instructions:", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).text(prescription.instructions);
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};