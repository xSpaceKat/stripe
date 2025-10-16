import * as paymentDAO from "../dataAcces/paymentDAO.js";
import { AppError } from "../utils/appError.js";

const createPayment = async (req, res) => {
  const { amount, currency } = req.body;
  if (!amount || amount <= 0) {
    throw new AppError("El monto debe ser mayor a 0", 400);
  }
  const payment = await paymentDAO.createPayment(amount, currency);

  res.json({
    paymentLink: `http://localhost:3000/payment.html?paymentid=${payment._id}`,
  });
};

const processPayment = async (req, res) => {
  const payment = await paymentDAO.updatePaymentStatus(
    req.params.id,
    "completed"
  );
  if (!payment) {
    throw new AppError("No se encontro el pago", 404);
  }
  res.json({ message: "Pago procesado", payment });
};

const getPayment = async (req, res) => {
  const payment = await paymentDAO.getPaymentById(req.params.id);
  if (!payment) {
    throw new AppError("No se encontro el pago", 404);
  }
  res.json(payment);
};

export { createPayment, processPayment, getPayment };
